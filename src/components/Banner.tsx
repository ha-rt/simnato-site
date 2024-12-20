import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { Icon, Text, Div, NarrowContainer } from '@ui-library';
import { PALETTE, GRADIENTS, COLORS, BREAKPOINTS } from '@src/theme';
import useScreenSize from '@stores/useScreenSize';

type BannerProps = {
	type: 'neutral' | 'warning' | 'notice' | 'important'; // add more types later
	noMargin?: boolean;
	children?: string | JSX.Element | (string | JSX.Element)[];
	justifyContent?: 'center' | 'start' | 'end' | 'between' | 'around' | 'evenly';
};

export const Banner = ({
	type,
	noMargin,
	justifyContent,
	children,
}: BannerProps) => {
	const { isMobile } = useScreenSize()
	const mode = type === 'neutral' || type === 'notice' ? 'dark' : 'light';

	return (
		<NarrowContainer>
			<StyledBanner noMargin={noMargin} color={type} isMobile={isMobile}>
				{type === 'warning' && (
					<Icon mode={mode} icon={type} spaceAfter title={type} />
				)}
				<Div
					flex
					justifyContent={justifyContent ?? 'center'}
					width="100%"
					gap="3px"
					flexDirection="col"
				>
					{children &&
						Array.isArray(children) &&
						children.map((c) => (
							<Text align="center" mode={mode}>
								{c}
							</Text>
						))}
					{children && !Array.isArray(children) && (
						<Text align="center" mode={mode}>
							{children}
						</Text>
					)}
				</Div>
			</StyledBanner>
		</NarrowContainer>
	);
};

const StyledBanner = styled.div<{
	noMargin?: boolean;
	color?: 'neutral' | 'warning' | 'notice' | 'important';
	isMobile: boolean
}>`
	display: flex;
	justify-content: center;
	align-items: center;
	/* width: ${({ isMobile }) => isMobile ? '100%': 'calc(100% - 10px)'}; */

	${({ color }) => {
		if (color === 'neutral') {
			return css`
				background-color: ${PALETTE.silver.main};
				p {
					color: ${COLORS.baseText};
				}
			`;
		}

		if (color === 'warning') {
			return css`
				background-color: ${PALETTE.gold.main};
				p {
					color: ${COLORS.darkText};
				}
			`;
		}

		if (color === 'notice') {
			return css`
				background-color: ${PALETTE.blue.light};
				p {
					color: ${COLORS.darkText};
				}
			`;
		}

		if (color === 'important') {
			return css`
				background: linear-gradient(0deg, ${GRADIENTS.main});
				p {
					color: ${COLORS.lightText};
				}
				a {
					color: ${COLORS.lightText};
					font-weight: 500;
				}
			`;
		}
	}}

	border-radius: 12px;
	padding: 0.3rem;

	${({ noMargin }) =>
		noMargin
			? css`
					margin: 0 !important;
			  `
			: css`
					margin: 10px;
			  `}
`;
