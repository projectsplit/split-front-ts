import { css } from "styled-components";

const spin = css`
  animation: spin-animation 1s linear infinite;
`;

const flex = css`
  display: flex;
  flex-wrap: nowrap;
`;

const vFlex = css`
  display: flex;
  flex-direction: column;
`;

const hFlex = css`
  display: flex;
  flex-direction: row;
`;

const flexDirectionRow = css`
  flex-direction: row;
`;

const flexDirectionColumn = css`
  flex-direction: column;
`;

const alignItemsCenter = css`
  align-items: center;
`;

const alignItemsStart = css`
  align-items: flex-start;
`;

const alignItemsEnd = css`
  align-items: flex-end;
`;

const justifyContentCenter = css`
  justify-content: center;
`;

const justifyContentStart = css`
  justify-content: flex-start;
`;

const justifyContentEnd = css`
  justify-content: flex-end;
`;

const justifyContentEvenly = css`
  justify-content: space-evenly;
`;

const justifyContentSpaceBetween = css`
  justify-content: space-between;
`;

const justifyContentSpaceAround = css`
  justify-content: space-around;
`;

const justifyContentFlexStart = css`
  justify-content: flex-start;
`;

const alignSelfCenter = css`
  align-self: center;
`;

const alignSelfEnd = css`
  align-self: flex-end;
`;

const flexWrap = css`
  flex-wrap: wrap;
`;

const fontSize66 = css`
  font-size: 66px;
`;

const fontSize36 = css`
  font-size: 46px;
`;
const fontSize20 = css`
  font-size: 20px;
`;

const fontSize12 = css`
  font-size: 12px;
`;

const positionRelative = css`
  position: relative;
`;

const positionAbsolute = css`
  position: absolute;
`;

const positionFixed = css`
  position: fixed;
`;

const positionSticky = css`
  position: sticky;
`;

const mixins = {
  flex,
  vFlex,
  hFlex,
  flexDirectionRow,
  flexDirectionColumn,
  alignItemsCenter,
  alignItemsStart,
  alignItemsEnd,
  justifyContentCenter,
  justifyContentStart,
  justifyContentEnd,
  justifyContentEvenly,
  justifyContentSpaceBetween,
  justifyContentSpaceAround,
  justifyContentFlexStart,
  alignSelfCenter,
  alignSelfEnd,
  flexWrap,
  fontSize66,
  fontSize36,
  fontSize20,
  fontSize12,
  positionRelative,
  positionAbsolute,
  positionFixed,
  positionSticky,
  spin,
};

export default mixins;
