/**
 * External dependencies
 */
import React, { ReactNode, FunctionComponent } from 'react';

/**
 * Internal dependencies
 */
import Card from 'components/card';
import CardHeading from 'components/card-heading';

interface MarketingToolFeatureProps {
	children: ReactNode;
	description: string;
	disclaimer: string;
	title: string;
}

const MarketingToolFeature: FunctionComponent< MarketingToolFeatureProps > = ( {
	children,
	description,
	disclaimer,
	title,
}: MarketingToolFeatureProps ) => {
	return (
		<Card className="tools__feature-list-item">
			<CardHeading>{ title }</CardHeading>
			<p>{ description }</p>
			{ disclaimer && <p className="tools__feature-list-item-disclaimer">{ disclaimer }</p> }
			{ children }
		</Card>
	);
};

export default MarketingToolFeature;
