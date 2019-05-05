/** @format */

/**
 * External dependencies
 */
import Gridicon from 'gridicons';
import React, { Fragment, FunctionComponent } from 'react';
import { useTranslate } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import GSuiteNewUser from './new-user';
import { newUser, GSuiteNewUser as NewUser, validateUser } from 'lib/gsuite/new-users';

interface Props {
	domains: any[];
	extraValidation: ( user: NewUser ) => NewUser;
	selectedDomainName: string;
	onUsersChange: ( users: NewUser[] ) => NewUser[];
	users: NewUser[];
}

const GSuiteNewUserList: FunctionComponent< Props > = ( {
	domains,
	extraValidation,
	selectedDomainName,
	onUsersChange,
	users,
} ) => {
	const translate = useTranslate();

	const onUserValueChange = ( index: number ) => ( field: string, value: string ) => {
		const modifiedUser = extraValidation(
			validateUser( { ...users[ index ], [ field ]: { value, error: null } } )
		);

		onUsersChange(
			users.map( ( user, userIndex ) => ( userIndex === index ? modifiedUser : user ) )
		);
	};

	const onUserAdd = () => {
		onUsersChange( [ ...users, newUser( selectedDomainName ) ] );
	};

	const onUserRemove = ( index: number ) => () => {
		const newUserList = users.filter( ( user, userIndex ) => userIndex !== index );
		onUsersChange( 0 < newUserList.length ? newUserList : [ newUser( selectedDomainName ) ] );
	};

	return (
		<div>
			{ users.map( ( user, index ) => (
				<Fragment key={ index }>
					<GSuiteNewUser
						domains={ domains ? domains.map( domain => domain.name ) : [ selectedDomainName ] }
						user={ user }
						onUserValueChange={ onUserValueChange( index ) }
						onUserRemove={ onUserRemove( index ) }
					/>
					<hr />
				</Fragment>
			) ) }
			<Button onClick={ onUserAdd }>
				<Gridicon icon="plus" />
				<span>{ translate( 'Add Another User' ) }</span>
			</Button>
		</div>
	);
};

export default GSuiteNewUserList;
