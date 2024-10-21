import { createColumnHelper } from "@tanstack/react-table";
import Row from "components/Row";
import { Table } from "components/Table";
import { Cell } from "components/Table/Cell";
import { Trans } from "i18n";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ThemedText } from "theme/components";
import { TARAXA_MAINNET_LIST } from "../../constants/lists";
import {
  TokenInfoDetails,
  PoolInfo,
  Incentive,
  indexerTaraswap,
  INCENTIVES_QUERY,
  POOL_QUERY,
  TaraxaMainnetListResponse,
  findTokenByAddress,
  PoolResponse,
  calculateApy,
} from "./types";
import { TokenLogoImage } from "../DoubleLogo";
import blankTokenUrl from "assets/svg/blank_token.svg";
import { useV3Positions } from "../../hooks/useV3Positions";
import { useAccount } from "../../hooks/useAccount";
import { FeeAmount, Pool, Position } from "@taraswap/v3-sdk";
import { Token } from "@taraswap/sdk-core";
import { useCall, useChainId } from "wagmi";
import { formatUnits } from "viem/utils";
import { MouseoverTooltip } from "components/Tooltip";
import styled from "styled-components";
import { Info } from "react-feather";
import { useV3StakerContract } from "../../hooks/useV3StakerContract";
import useTotalPositions, { PositionsResponse } from "hooks/useTotalPositions";

const LOGO_DEFAULT_SIZE = 30;

const StyledInfoIcon = styled(Info)`
  height: 12px;
  width: 12px;
  flex: 1 1 auto;
  stroke: ${({ theme }) => theme.neutral2};
`;

const PoolTokenImage = ({
  pool,
}: {
  pool: {
    token0: TokenInfoDetails | undefined;
    token1: TokenInfoDetails | undefined;
  };
}) => {
  return (
    <Row gap="4px">
      {pool.token0?.logoURI && (
        <TokenLogoImage
          size={LOGO_DEFAULT_SIZE}
          src={pool.token0?.logoURI ?? blankTokenUrl}
        />
      )}
      {pool.token1?.logoURI && (
        <TokenLogoImage
          size={LOGO_DEFAULT_SIZE}
          src={pool.token1?.logoURI ?? blankTokenUrl}
        />
      )}
      {pool.token0?.symbol}-{pool.token1?.symbol}
    </Row>
  );
};

export default function Incentives() {
  const account = useAccount();
  const chainId = useChainId();
  const v3StakerContract = useV3StakerContract(true);
  const [tokenList, setTokenList] = useState<TokenInfoDetails[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rawIncentivesData, setRawIncentivesData] = useState<Incentive[]>([]);
  const [poolTransactionTableValues, setPoolTransactionTableValues] = useState<
    PoolInfo[]
  >([]);
  const [userPositionsGql, setUserPositionsGql] = useState<PositionsResponse[]>(
    []
  );
  const { positions, loading: positionsLoading } = useV3Positions(
    account.address
  );
  const { getPositionsWithDepositsOfUser, isLoading: isLoadingDepositData } =
    useTotalPositions();
  const positionsKey = positions
    ?.map((pos) => pos.tokenId)
    .sort()
    .join("-");

  const getUserPositionsGql = useCallback(async () => {
    if (!account || !account.address) return;

    const positions = await getPositionsWithDepositsOfUser(account.address);
    setUserPositionsGql(positions);
  }, [getPositionsWithDepositsOfUser, account]);

  useEffect(() => {
    getUserPositionsGql();
  }, []);

  const userPositions = useMemo(() => {
    if (
      isLoadingDepositData ||
      !userPositionsGql ||
      userPositionsGql.length == 0
    )
      return [];
    return userPositionsGql.map((position) => {
      return {
        poolAddress: position.pool.id,
        tokenId: position.id.toString(),
        liquidity: position.liquidity.toString(),
        depositedToken0: position.depositedToken0,
        depositedToken1: position.depositedToken1,
        tickLower: position.tickLower.toString(),
        tickUpper: position.tickUpper.toString(),
      };
    });
  }, [
    positionsLoading,
    isLoadingDepositData,
    userPositionsGql,
    positionsKey,
    chainId,
  ]);

  const fetchCoinDetails = useCallback(async () => {
    const response = await fetch(TARAXA_MAINNET_LIST);
    const data: TaraxaMainnetListResponse =
      (await response.json()) as TaraxaMainnetListResponse;
    if (data && data.tokens) {
      setTokenList(data.tokens);
    }
  }, []);

  const fetchTokensForPool = async (
    poolId: string
  ): Promise<PoolResponse | null> => {
    if (!indexerTaraswap || !poolId) {
      return null;
    }
    const response = await fetch(indexerTaraswap, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: POOL_QUERY,
        variables: { id: poolId },
      }),
    });
    const data = await response.json();
    if (data && data.data && data.data.pools) {
      return data.data.pools[0];
    }
    return null;
  };

  const fetchIncentivesData = useCallback(async () => {
    if (!indexerTaraswap) {
      return;
    }
    const response = await fetch(indexerTaraswap, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: INCENTIVES_QUERY }),
    });
    const data = await response.json();
    if (data && data.data && data.data.incentives) {
      let incentivesData: Incentive[] = data.data.incentives.filter(
        (incentive: Incentive) => incentive.ended === false
      );
      setRawIncentivesData(incentivesData);
    }
  }, [indexerTaraswap]);

  useEffect(() => {
    fetchIncentivesData();
  }, []);

  const processIncentives = useCallback(
    async (
      userPositionsParam: {
        poolAddress: string;
        tokenId: string;
        depositedToken0: string;
        depositedToken1: string;
        liquidity: string;
        tickLower: string;
        tickUpper: string;
      }[]
    ) => {
      setIsLoading(true);

      const poolInfo = await Promise.all(
        rawIncentivesData.map(async (incentive) => {
          const poolDetails = await fetchTokensForPool(incentive.pool.id);
          let pendingRewards = "0";
          if (poolDetails && poolDetails.token0 && poolDetails.token1) {
            // Extract necessary data
            const totalPoolLiquidity = parseFloat(poolDetails.liquidity);
            // Format the value reward
            const totalRewardsToken = formatUnits(
              BigInt(incentive.reward),
              incentive.rewardToken.decimals
            );
            if (v3StakerContract) {
              const allRewards = await v3StakerContract?.rewards(
                incentive.rewardToken.id,
                account.address
              );
              pendingRewards = formatUnits(
                BigInt(allRewards),
                incentive.rewardToken.decimals
              );
            }

            const annualRewardPerStandardLiquidity = calculateApy(
              incentive,
              totalPoolLiquidity,
              totalRewardsToken
            );

            const poolPosition = userPositionsParam.filter((userPosition) => {
              return (
                userPosition.poolAddress.toLowerCase() ===
                poolDetails.id.toLowerCase()
              );
            });

            const relevantPosition = userPositionsGql.find(
              (pos) =>
                pos.pool.id.toLowerCase() === poolDetails.id.toLowerCase()
            );

            let unifiedTokenId = poolPosition[0]
              ? poolPosition[0].tokenId
              : relevantPosition?.id;

            const totalDeposit = poolPosition[0]
              ? poolPosition[0].liquidity
              : relevantPosition
              ? relevantPosition.liquidity.toString()
              : "0";

            const positionId = poolPosition[0]
              ? poolPosition[0].tokenId
              : relevantPosition
              ? relevantPosition.id
              : "";

            const token0 = findTokenByAddress(tokenList, poolDetails.token0.id);
            const token1 = findTokenByAddress(tokenList, poolDetails.token1.id);

            const depositDisplay = relevantPosition
              ? `${parseFloat(relevantPosition.depositedToken0 ?? "0").toFixed(
                  4
                )} ${token0?.symbol} + ${parseFloat(
                  relevantPosition.depositedToken1 ?? "0"
                ).toFixed(4)} ${token1?.symbol}`
              : "-";

            return {
              ...poolDetails,
              address: poolDetails.id,
              pool: {
                token0: token0,
                token1: token1,
              },
              feeTier: poolDetails.feeTier,
              tvl: poolDetails.totalValueLockedUSD,
              totalDeposit: totalDeposit,
              positionId: positionId,
              totalrewards: totalRewardsToken,
              tokenreward: incentive.rewardToken.symbol,
              depositedToken0: relevantPosition
                ? relevantPosition.depositedToken0
                : 0,
              depositedToken1: relevantPosition
                ? relevantPosition.depositedToken1
                : 0,
              tickLower: poolPosition[0] ? poolPosition[0].tickLower : "0",
              tickUpper: poolPosition[0] ? poolPosition[0].tickUpper : "0",
              apy: annualRewardPerStandardLiquidity,
              link:
                (poolPosition[0] && poolPosition[0].tokenId) || relevantPosition
                  ? `/pool/${unifiedTokenId}?incentive=${incentive.id}`
                  : `/add/${poolDetails.token0.id}/${poolDetails.token1.id}`,
              pendingRewards,
              displayedTotalDeposit: depositDisplay,
            } as PoolInfo;
          }
          return null;
        })
      );
      setIsLoading(false);
      let filteredData = poolInfo.filter((pool) => pool !== null) as PoolInfo[];
      return filteredData;
    },
    [rawIncentivesData, userPositionsGql, userPositions]
  );

  useEffect(() => {
    if (
      rawIncentivesData &&
      rawIncentivesData.length > 0 &&
      tokenList?.length > 0
    ) {
      processIncentives(userPositions).then((data) => {
        if (data) {
          setPoolTransactionTableValues(data);
        }
      });
    }
  }, [rawIncentivesData, tokenList, userPositions, userPositionsGql]);

  useEffect(() => {
    fetchCoinDetails();
  }, [fetchCoinDetails]);

  const columns = useMemo(() => {
    const columnHelper = createColumnHelper<PoolInfo>();
    return [
      columnHelper.accessor("pool", {
        id: "pool",
        header: () => (
          <Cell minWidth={200} justifyContent="flex-start" grow>
            <Row gap="4px">
              <ThemedText.BodySecondary>
                <Trans i18nKey="common.incentives.pool.label" />
              </ThemedText.BodySecondary>
            </Row>
          </Cell>
        ),
        cell: (pool) => (
          <Cell
            loading={isLoading}
            minWidth={200}
            justifyContent="flex-start"
            grow
          >
            <ThemedText.BodySecondary>
              <PoolTokenImage pool={pool.getValue?.()} />
            </ThemedText.BodySecondary>
          </Cell>
        ),
      }),
      columnHelper.accessor("feeTier", {
        id: "feeTier",
        header: () => (
          <Cell minWidth={200} justifyContent="flex-start" grow>
            <Row gap="4px">
              <ThemedText.BodySecondary>
                <Trans i18nKey="common.incentives.pool.feeTier" />
              </ThemedText.BodySecondary>
            </Row>
          </Cell>
        ),
        cell: (feeTier) => (
          <Cell loading={isLoading} minWidth={200}>
            <ThemedText.BodySecondary>
              {parseFloat(
                (Number(feeTier.getValue?.() || "0") / 100000).toString()
              ).toFixed(3)}
              %
            </ThemedText.BodySecondary>
          </Cell>
        ),
      }),
      columnHelper.accessor("apy", {
        id: "apy",
        header: () => (
          <Cell minWidth={200}>
            <ThemedText.BodySecondary>
              <Row gap="4px">
                <Trans i18nKey="common.incentives.apy" />
                <MouseoverTooltip
                  placement="right"
                  text={<Trans i18nKey="common.incentives.apy.description" />}
                >
                  <StyledInfoIcon />
                </MouseoverTooltip>
              </Row>
            </ThemedText.BodySecondary>
          </Cell>
        ),
        cell: (apy) => (
          <Cell loading={isLoading} minWidth={200}>
            <ThemedText.BodySecondary>
              {apy.getValue?.().toFixed(8)}
            </ThemedText.BodySecondary>
          </Cell>
        ),
      }),
      columnHelper.accessor("tvl", {
        id: "tvl",
        header: () => (
          <Cell minWidth={200}>
            <ThemedText.BodySecondary>
              <Trans i18nKey="common.incentives.pool.tvl" />
            </ThemedText.BodySecondary>
          </Cell>
        ),
        cell: (tvl) => {
          // Get the raw value
          const tvlValue = tvl.getValue?.();

          // Safeguard against undefined values
          if (!tvlValue) {
            return null;
          }

          // Parse and format the value
          const tvlNumber = parseFloat(tvlValue);
          const tvlFormatted = tvlNumber.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          return (
            <Cell loading={isLoading} minWidth={200}>
              <ThemedText.BodySecondary>
                {tvlFormatted}
              </ThemedText.BodySecondary>
            </Cell>
          );
        },
      }),
      columnHelper.accessor("totalrewards", {
        id: "totalrewards",
        header: () => (
          <Cell minWidth={200}>
            <ThemedText.BodySecondary>
              <Trans i18nKey="common.incentives.total.program.rewards" />
            </ThemedText.BodySecondary>
          </Cell>
        ),
        cell: (totalrewards) => {
          // Get the raw value
          const totalrewardsValue = totalrewards.getValue?.();

          // Safeguard against undefined values
          if (!totalrewardsValue) {
            return null;
          }

          const totalrewardsFormatted = Number(
            totalrewardsValue
          ).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });

          return (
            <Cell loading={isLoading} minWidth={200}>
              <ThemedText.BodySecondary>
                {totalrewardsFormatted}
              </ThemedText.BodySecondary>
            </Cell>
          );
        },
      }),
      columnHelper.accessor("tokenreward", {
        id: "tokenreward",
        header: () => (
          <Cell minWidth={200}>
            <ThemedText.BodySecondary>
              <Trans i18nKey="common.incentives.token.reward" />
            </ThemedText.BodySecondary>
          </Cell>
        ),
        cell: (tokenreward) => (
          <Cell loading={isLoading} minWidth={200}>
            <ThemedText.BodySecondary>
              {tokenreward.getValue?.()}
            </ThemedText.BodySecondary>
          </Cell>
        ),
      }),
      columnHelper.accessor("displayedTotalDeposit", {
        id: "displayedTotalDeposit",
        header: () => (
          <Cell minWidth={200}>
            <ThemedText.BodySecondary>
              <Trans i18nKey="common.incentives.total.deposits" />
            </ThemedText.BodySecondary>
          </Cell>
        ),
        cell: (displayedTotalDeposit) => (
          <Cell loading={isLoading} minWidth={200} justifyContent="center">
            <ThemedText.BodySecondarySmall style={{ textAlign: "right" }}>
              {displayedTotalDeposit.getValue?.()}
            </ThemedText.BodySecondarySmall>
          </Cell>
        ),
      }),
      columnHelper.accessor("pendingRewards", {
        id: "pendingRewards",
        header: () => (
          <Cell minWidth={200}>
            <ThemedText.BodySecondary>
              <Row gap="4px">
                <Trans i18nKey="common.incentives.pending.reward" />
                <MouseoverTooltip
                  placement="right"
                  text={
                    <Trans i18nKey="common.incentives.pending.description" />
                  }
                >
                  <StyledInfoIcon />
                </MouseoverTooltip>
              </Row>
            </ThemedText.BodySecondary>
          </Cell>
        ),
        cell: (pendingRewards) => (
          <Cell loading={isLoading} minWidth={200}>
            <ThemedText.BodySecondary>
              {pendingRewards.getValue?.()}
            </ThemedText.BodySecondary>
          </Cell>
        ),
      }),
    ];
  }, [isLoading]);

  return (
    <Table
      columns={columns}
      data={poolTransactionTableValues}
      loading={isLoading}
      maxWidth={1200}
    />
  );
}
