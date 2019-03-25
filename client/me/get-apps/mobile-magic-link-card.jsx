/** @format */

/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import ActionCard from 'components/action-card';
import getUserSettings from 'state/selectors/get-user-settings';

class MobileMagicLinkCard extends React.Component {
	render() {
		return (
			<>
				<ActionCard
					headerText={ this.props.translate( 'Log in to your mobile app' ) }
					mainText={ this.props.translate(
						'Get a link sent to the email address associated with your account to instantly log in to the WordPress app on your mobile device.'
					) }
					buttonText={ this.props.translate( 'Email me a log in link' ) }
					buttonOnClick={ () => {
						this.requestLink();
					} }
				/>
			</>
		);
	}

	requestLink = () => {
		var email = this.props.userSettings.user_email;
		wpcom.undocumented().requestMagicLoginEmail( {
			email,
			apiVersion: '1.1',
			scheme: 'wpdebug',
		} );
	};
}

export default connect( state => ( {
	userSettings: getUserSettings( state ),
} ) )( localize( MobileMagicLinkCard ) );
