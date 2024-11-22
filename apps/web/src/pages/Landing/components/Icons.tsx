type IconProps = {
  fill?: string;
  size?: string;
};

export function Wallet(props: IconProps) {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 4C2.34315 4 1 5.34315 1 7V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V7C23 5.34315 21.6569 4 20 4H4ZM3 12.2676V11C3 10.4485 3.44812 10 4.00115 10H19.9989C20.5519 10 21 10.4485 21 11V12.2676C20.7058 12.0974 20.3643 12 20 12H16C15.4477 12 14.9935 12.5284 14.7645 13.1028C14.4438 13.9072 13.789 14.8571 12 14.8571C10.29 14.8571 9.48213 13.9893 9.1936 13.2102C8.96576 12.595 8.49905 12 7.91447 12H4C3.63571 12 3.29417 12.0974 3 12.2676ZM19.9989 8C20.3498 8 20.6868 8.06029 21 8.17109V7C21 6.44772 20.5523 6 20 6H4C3.44772 6 3 6.44772 3 7V8.17109C3.31318 8.06029 3.65018 8 4.00115 8H19.9989Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function HelpCircle(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM12.02 17.5C11.468 17.5 11.0149 17.052 11.0149 16.5C11.0149 15.948 11.458 15.5 12.01 15.5H12.02C12.573 15.5 13.02 15.948 13.02 16.5C13.02 17.052 12.572 17.5 12.02 17.5ZM13.603 12.5281C12.872 13.0181 12.7359 13.291 12.7109 13.363C12.6059 13.676 12.314 13.874 12 13.874C11.921 13.874 11.841 13.862 11.762 13.835C11.369 13.703 11.1581 13.278 11.2891 12.885C11.4701 12.345 11.9391 11.836 12.7671 11.281C13.7881 10.597 13.657 9.84707 13.614 9.60107C13.501 8.94707 12.95 8.38988 12.303 8.27588C11.811 8.18588 11.3301 8.31488 10.9541 8.62988C10.5761 8.94688 10.3589 9.41391 10.3589 9.90991C10.3589 10.3239 10.0229 10.6599 9.60889 10.6599C9.19489 10.6599 8.85889 10.3239 8.85889 9.90991C8.85889 8.96891 9.27099 8.08396 9.98999 7.48096C10.702 6.88496 11.639 6.63605 12.564 6.80005C13.831 7.02405 14.8701 8.07097 15.0911 9.34497C15.3111 10.607 14.782 11.7381 13.603 12.5281Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function BookOpen(props: IconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.5 5.31967V18.3297C21.5 18.6597 21.1801 18.8898 20.8501 18.7998C18.4661 18.1208 16.073 18.1177 13.687 19.3077C13.486 19.4077 13.249 19.2717 13.249 19.0467V5.85276C13.249 5.78576 13.2701 5.71877 13.3091 5.66477C13.9321 4.80977 14.896 4.21471 16.019 4.07871C17.831 3.85871 19.5731 4.07879 21.2141 4.86179C21.3891 4.94479 21.5 5.12667 21.5 5.31967ZM8.97998 4.07968C7.16798 3.85968 5.42591 4.07976 3.78491 4.86276C3.61091 4.94576 3.5 5.12777 3.5 5.32077V18.3308C3.5 18.6608 3.8199 18.8908 4.1499 18.8008C6.5339 18.1218 8.92699 18.1187 11.313 19.3087C11.514 19.4087 11.751 19.2727 11.751 19.0477V5.85373C11.751 5.78673 11.7299 5.71974 11.6909 5.66574C11.0669 4.81074 10.104 4.21568 8.97998 4.07968Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function ChatBubbles(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.8789 20.394C21.1189 20.594 20.9789 20.994 20.6689 20.994C19.6389 21.034 18.0591 20.894 17.0891 19.864C16.2991 20.144 15.419 20.2841 14.499 20.2841C12.481 20.2841 10.686 19.607 9.49902 18.368C9.31002 18.17 9.35802 17.785 9.79102 17.819C10.024 17.835 10.259 17.844 10.499 17.844C15.119 17.844 18.614 15.143 19.353 11.235C19.403 10.973 19.7291 10.886 19.8931 11.097C20.5931 12.003 20.998 13.1481 20.998 14.5031C20.998 16.0331 20.4679 17.314 19.5879 18.264C19.6989 18.964 20.0889 19.754 20.8789 20.394ZM17.998 9.67102C17.998 9.62402 17.992 9.58103 17.991 9.53503C17.917 5.44903 14.594 3 10.499 3C6.35802 3 3 5.50202 3 9.67102C3 11.439 3.608 12.915 4.625 14.015C4.5 14.816 4.05009 15.733 3.14209 16.467C2.86709 16.7 3.02503 17.159 3.38403 17.167C4.56703 17.209 6.39203 17.05 7.50903 15.858C7.73703 15.937 7.97094 16.006 8.21094 16.066C8.93194 16.247 9.69998 16.3409 10.501 16.3409C14.64 16.3419 17.998 13.84 17.998 9.67102Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function Computer(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.3164 14.7471C21.3164 16.7471 20.3164 17.7471 18.3164 17.7471H14.3164V20.9971H16.8164C17.2264 20.9971 17.5664 21.3371 17.5664 21.7471C17.5664 22.1571 17.2264 22.4971 16.8164 22.4971H7.81641C7.40641 22.4971 7.06641 22.1571 7.06641 21.7471C7.06641 21.3371 7.40641 20.9971 7.81641 20.9971H10.3164V17.7471H6.31641C4.31641 17.7471 3.31641 16.7471 3.31641 14.7471C3.31641 14.6091 3.42841 14.4971 3.56641 14.4971H21.0664C21.2044 14.4971 21.3164 14.6091 21.3164 14.7471ZM18.3164 3.74707H6.31641C4.31641 3.74707 3.31641 4.74707 3.31641 6.74707V12.7471C3.31641 12.8851 3.42841 12.9971 3.56641 12.9971H21.0664C21.2044 12.9971 21.3164 12.8851 21.3164 12.7471V6.74707C21.3164 4.74707 20.3164 3.74707 18.3164 3.74707Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg
      style={{ flex: "none" }}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 12.1143C4 11.562 4.44771 11.1143 5 11.1143L16.5858 11.1143L11.2929 5.82136C10.9024 5.43084 10.9024 4.79767 11.2929 4.40715C11.6834 4.01663 12.3166 4.01663 12.7071 4.40715L19.7071 11.4072C20.0976 11.7977 20.0976 12.4308 19.7071 12.8214L12.7071 19.8214C12.3166 20.2119 11.6834 20.2119 11.2929 19.8214C10.9024 19.4308 10.9024 18.7977 11.2929 18.4072L16.5858 13.1143L5 13.1143C4.44771 13.1143 4 12.6665 4 12.1143Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function Github(props: IconProps) {
  return (
    <svg
      width={props.size ?? "41"}
      height={props.size ?? "41"}
      viewBox="0 0 41 41"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.7188 20.9043C35.7188 27.5543 31.3854 33.1709 25.4021 35.1543C24.6854 35.2709 24.4354 34.821 24.4354 34.4376C24.4354 33.9376 24.4521 32.321 24.4521 30.321C24.4521 28.921 23.9688 28.0043 23.4354 27.5376C26.7688 27.171 30.2854 25.9043 30.2854 20.1376C30.2854 18.5043 29.7021 17.171 28.7354 16.121C28.9021 15.7376 29.4187 14.2043 28.6021 12.1376C28.6021 12.1376 27.3354 11.7377 24.4688 13.6877C23.2687 13.3543 21.9854 13.1876 20.7188 13.1709C19.4354 13.1876 18.1521 13.3543 16.9688 13.6877C14.1021 11.7377 12.8354 12.1376 12.8354 12.1376C12.0188 14.2043 12.5354 15.7376 12.6854 16.121C11.7354 17.171 11.1521 18.5043 11.1521 20.1376C11.1521 25.8876 14.6521 27.1709 17.9854 27.5543C17.5521 27.9209 17.1687 28.5876 17.0354 29.5543C16.1687 29.9376 14.0021 30.6043 12.6687 28.3043C12.6687 28.3043 11.8687 26.8709 10.3687 26.7709C10.3687 26.7709 8.90205 26.7543 10.2687 27.671C10.2687 27.671 11.2521 28.1376 11.9354 29.871C11.9354 29.871 12.8021 32.5543 16.9854 31.6376C16.9854 32.8876 17.0021 34.071 17.0021 34.4376C17.0021 34.8043 16.7354 35.2709 16.0354 35.1543C10.0521 33.1876 5.71875 27.5543 5.71875 20.9043C5.71875 12.621 12.4354 5.9043 20.7188 5.9043C29.0021 5.9043 35.7188 12.621 35.7188 20.9043Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function Telegram(props: IconProps) {
  return (
    <svg
      width={props.size ?? "41"}
      height={props.size ?? "41"}
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0" />

      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      />

      <g id="SVGRepo_iconCarrier">
        {" "}
        <circle
          cx="16"
          cy="16"
          r="14"
          fill="url(#paint0_linear_87_7225)"
        />{" "}
        <path
          d="M22.9866 10.2088C23.1112 9.40332 22.3454 8.76755 21.6292 9.082L7.36482 15.3448C6.85123 15.5703 6.8888 16.3483 7.42147 16.5179L10.3631 17.4547C10.9246 17.6335 11.5325 17.541 12.0228 17.2023L18.655 12.6203C18.855 12.4821 19.073 12.7665 18.9021 12.9426L14.1281 17.8646C13.665 18.3421 13.7569 19.1512 14.314 19.5005L19.659 22.8523C20.2585 23.2282 21.0297 22.8506 21.1418 22.1261L22.9866 10.2088Z"
          fill="white"
        />{" "}
        <defs>
          {" "}
          <linearGradient
            id="paint0_linear_87_7225"
            x1="16"
            y1="2"
            x2="16"
            y2="30"
            gradientUnits="userSpaceOnUse"
          >
            {" "}
            <stop stop-color="#37BBFE" />{" "}
            <stop offset="1" stop-color="#007DBB" />{" "}
          </linearGradient>{" "}
        </defs>{" "}
      </g>
    </svg>
  );
}

export function Twitter(props: IconProps) {
  return (
    <svg
      width={props.size ?? "41"}
      height={props.size ?? "41"}
      viewBox="0 0 41 41"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M33.9523 14.2212C33.9689 14.5045 33.9689 14.8045 33.9689 15.1045C33.9689 24.0045 27.1022 34.2545 14.5356 34.2545C10.6689 34.2545 7.06891 33.1545 4.05225 31.2378C4.60225 31.3045 5.13559 31.3212 5.70226 31.3212C8.90226 31.3212 11.8356 30.2545 14.1856 28.4545C11.1856 28.3878 8.66891 26.4545 7.80225 23.7878C8.21891 23.8545 8.65225 23.8878 9.08559 23.8878C9.70225 23.8878 10.3189 23.8045 10.8856 23.6545C7.75226 23.0211 5.40224 20.3212 5.40224 17.0545V16.9712C6.31891 17.4712 7.36892 17.7878 8.48559 17.8211C6.65225 16.6045 5.43558 14.5545 5.43558 12.2211C5.43558 10.9711 5.76891 9.82115 6.36891 8.82115C9.73558 12.9045 14.7856 15.5711 20.4522 15.8711C20.3522 15.3711 20.2856 14.8545 20.2856 14.3378C20.2856 10.6211 23.3356 7.60449 27.1189 7.60449C29.0856 7.60449 30.8689 8.42114 32.1023 9.72114C33.6523 9.43781 35.1189 8.87116 36.4356 8.1045C35.9356 9.67116 34.8523 10.9878 33.4356 11.8045C34.8023 11.6545 36.1356 11.2878 37.3689 10.7711C36.4356 12.1045 35.2689 13.2878 33.9356 14.2545L33.9523 14.2212Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function Discord(props: IconProps) {
  return (
    <svg
      width={props.size ?? "41"}
      height={props.size ?? "41"}
      viewBox="0 0 41 41"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32.3019 11.3373C30.1352 10.354 27.8186 9.6373 25.4186 9.2373C25.1186 9.75397 24.7852 10.454 24.5519 11.004C21.9852 10.6373 19.4519 10.6373 16.9186 11.004C16.6852 10.454 16.3352 9.75397 16.0519 9.2373C13.6352 9.6373 11.3186 10.354 9.16857 11.3373C4.8019 17.704 3.61856 23.9206 4.21856 30.054C7.11856 32.1373 9.91858 33.404 12.6686 34.2373C13.3352 33.3373 13.9519 32.3706 14.4686 31.354C13.4686 30.9873 12.5186 30.5373 11.6186 30.004C11.8519 29.8373 12.0852 29.654 12.3019 29.4707C17.7852 31.954 23.7519 31.954 29.1686 29.4707C29.4019 29.654 29.6186 29.8373 29.8519 30.004C28.9519 30.5373 28.0019 30.9873 27.0019 31.354C27.5185 32.3706 28.1352 33.3373 28.8019 34.2373C31.5519 33.404 34.3686 32.1373 37.2519 30.054C37.9852 22.954 36.1019 16.7873 32.3352 11.3373H32.3019ZM15.1852 26.1873C13.5352 26.1873 12.1852 24.6873 12.1852 22.854C12.1852 21.0207 13.5019 19.5207 15.1852 19.5207C16.8685 19.5207 18.2186 21.0207 18.1852 22.854C18.1852 24.6873 16.8519 26.1873 15.1852 26.1873ZM26.2519 26.1873C24.6019 26.1873 23.2519 24.6873 23.2519 22.854C23.2519 21.0207 24.5686 19.5207 26.2519 19.5207C27.9352 19.5207 29.2852 21.0207 29.2519 22.854C29.2519 24.6873 27.9352 26.1873 26.2519 26.1873Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function Bars(props: IconProps) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.7148 21.0011H11.7148C10.7148 21.0011 10.2148 20.5011 10.2148 19.5011V4.50108C10.2148 3.50108 10.7148 3.00108 11.7148 3.00108H12.7148C13.7148 3.00108 14.2148 3.50108 14.2148 4.50108V19.5011C14.2148 20.5011 13.7148 21.0011 12.7148 21.0011ZM21.2148 19.5011V9.50108C21.2148 8.50108 20.7148 8.00108 19.7148 8.00108H18.7148C17.7148 8.00108 17.2148 8.50108 17.2148 9.50108V19.5011C17.2148 20.5011 17.7148 21.0011 18.7148 21.0011H19.7148C20.7148 21.0011 21.2148 20.5011 21.2148 19.5011ZM7.21484 19.5011V13.5011C7.21484 12.5011 6.71484 12.0011 5.71484 12.0011H4.71484C3.71484 12.0011 3.21484 12.5011 3.21484 13.5011V19.5011C3.21484 20.5011 3.71484 21.0011 4.71484 21.0011H5.71484C6.71484 21.0011 7.21484 20.5011 7.21484 19.5011Z"
        fill={props.fill}
      />
    </svg>
  );
}

export function CodeBrackets(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.00001 17C6.74401 17 6.48801 16.902 6.29301 16.707L2.29301 12.707C1.90201 12.317 1.90201 11.683 2.29301 11.293L6.29301 7.29299C6.68401 6.90199 7.31601 6.90199 7.70701 7.29299C8.09801 7.68299 8.09801 8.31699 7.70701 8.70699L4.41401 12L7.70701 15.293C8.09801 15.683 8.09801 16.317 7.70701 16.707C7.51201 16.902 7.25601 17 7.00001 17ZM17.707 16.707L21.707 12.707C22.098 12.317 22.098 11.683 21.707 11.293L17.707 7.29299C17.316 6.90199 16.684 6.90199 16.293 7.29299C15.902 7.68299 15.902 8.31699 16.293 8.70699L19.586 12L16.293 15.293C15.902 15.683 15.902 16.317 16.293 16.707C16.488 16.902 16.744 17 17 17C17.256 17 17.512 16.902 17.707 16.707ZM9.937 20.351L15.937 4.35101C16.131 3.83401 15.869 3.25699 15.352 3.06399C14.834 2.86999 14.259 3.13198 14.064 3.64898L8.064 19.649C7.87 20.166 8.13201 20.743 8.64901 20.936C8.76501 20.98 8.88301 21 9.00001 21C9.40501 21 9.786 20.752 9.937 20.351Z"
        fill={props.fill}
      />
    </svg>
  );
}
