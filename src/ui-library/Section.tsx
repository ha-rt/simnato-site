import React, { FC, ReactNode } from "react";
import styled, { css } from "styled-components";
import { MODES, PALETTE, GRADIENTS, BREAKPOINTS } from "../theme";
import { GenericContainer } from "./Container";

type SectionProps = {
  children: ReactNode;
  height?: string;
  maxHeight?: string;
  mode?: MODES;
  gradient?: "vertical" | "horizontal" | number | undefined; // Accepts number as degree
  center?: boolean;
};

export const Section: FC<SectionProps> = ({
  children,
  mode = "light",
  gradient = undefined,
  height = "auto",
  maxHeight = undefined,
  center = false,
}) => {
  return (
    <OutterWrapper>
      <FullWidthSection
        id="section"
        gradient={gradient}
        height={height}
        maxHeight={maxHeight}
      >
        {children}
      </FullWidthSection>
    </OutterWrapper>
  );
};

const OutterWrapper = styled.div`
  padding: 0.5rem;
`;

const FullWidthSection = styled.section<Omit<SectionProps, "children">>`
  border-radius: 20px;
  ${({ height }) =>
    height &&
    css`
      min-height: ${height};
    `}
  ${({ maxHeight }) =>
    maxHeight &&
    css`
      max-height: ${maxHeight};
    `}
  ${(props) =>
    props.gradient &&
    `
    background: linear-gradient(
      ${
        typeof props.gradient === "number"
          ? `${props.gradient}deg`
          : props.gradient === "vertical"
          ? "to bottom"
          : "to right"
      },
      ${
        props.mode === "light"
          ? GRADIENTS.light
          : props.mode === "dark"
          ? GRADIENTS.dark
          : props.mode === "gold"
          ? GRADIENTS.near_white
          : GRADIENTS.main
      }
    );
  `}
`;

export const SubContainer = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
	max-width: 650px;
	margin-left: auto;
	margin-right: auto;
`;

export const SplitScreen = styled.div`
  @media (min-width: ${BREAKPOINTS.sm}) {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    & > div {
      width: 50%;
    }
  }
`;
