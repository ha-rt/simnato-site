import React, { FC, ReactNode } from 'react';
import styled, { css } from 'styled-components';
import { MODES, PALETTE, GRADIENTS } from '../theme';

type SectionProps = {
	children: ReactNode;
	height?: string;
	maxHeight?: string;
	mode?: MODES;
	gradient?: 'vertical' | 'horizontal' | undefined;
	center?: boolean;
};

// Full-width section that stretches edge to edge of the screen
const FullWidthSection = styled.section<Omit<SectionProps, 'children'>>`
	width: 100%;
	${({ height }) =>
		height &&
		css`
			height: ${height};
		`}
	${({ maxHeight }) =>
		maxHeight &&
		css`
			max-height: ${maxHeight};
		`}
	background-color: ${(props) => {
		switch (props.mode) {
			case 'light':
				return PALETTE.mono.near_white;
			case 'dark':
				return PALETTE.blue.dark;
			case 'gold':
				return PALETTE.gold.main;
			case 'blue':
				return PALETTE.blue.main;
			default:
				return PALETTE.mono.main;
		}
	}};

	${(props) =>
		props.gradient &&
		`
    background: linear-gradient(
      ${props.gradient === 'vertical' ? 'to bottom' : 'to right'},
      ${
				props.mode === 'light'
					? GRADIENTS.light
					: props.mode === 'dark'
					? GRADIENTS.dark
					: props.mode === 'gold'
					? GRADIENTS.near_white
					: GRADIENTS.main
			}
    );
  `}
`;

// Generic responsive container inside the full-width section
const Container = styled.div<{ center: boolean }>`
	max-width: 1200px;
	padding: 20px 20px;
	${({ center }) =>
		center &&
		css`
			display: flex;
			flex-direction: column;
			justify-content: center;
		`}
`;

const Section: FC<SectionProps> = ({
	children,
	mode = 'light',
	gradient = undefined,
	height = 'auto',
	maxHeight = undefined,
	center = false,
}) => {
	return (
		<FullWidthSection
			id="section"
			mode={mode}
			gradient={gradient}
			height={height}
			maxHeight={maxHeight}
		>
			<Container center={center}>{children}</Container>
		</FullWidthSection>
	);
};

export default Section;
