import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import {
	// eslint-disable-next-line
	__experimentalVStack as VStack,
	// eslint-disable-next-line
	__experimentalText as Text,
	// eslint-disable-next-line
	__experimentalHeading as Heading,
	// eslint-disable-next-line
	__experimentalNavigatorToParentButton as NavigatorToParentButton,
	PanelBody,
	Button,
	TextControl,
} from '@wordpress/components';
import { chevronLeft, copy } from '@wordpress/icons';
import { postCreateThemeVariation } from '../resolvers';

export const CreateVariationPanel = () => {
	const { createErrorNotice } = useDispatch( noticesStore );

	const [ theme, setTheme ] = useState( {
		name: '',
	} );

	const handleCreateVariationClick = () => {
		postCreateThemeVariation( theme.name )
			.then( () => {
				// eslint-disable-next-line
				alert(
					__(
						'Theme variation created successfully. The editor will now reload.',
						'create-block-theme'
					)
				);
				window.location.reload();
			} )
			.catch( ( error ) => {
				const errorMessage =
					error.message ||
					__(
						'An error occurred while attempting to create the theme variation.',
						'create-block-theme'
					);
				createErrorNotice( errorMessage, { type: 'snackbar' } );
			} );
	};

	return (
		<PanelBody>
			<Heading>
				<NavigatorToParentButton icon={ chevronLeft }>
					{ __( 'Create Variation', 'create-block-theme' ) }
				</NavigatorToParentButton>
			</Heading>

			<VStack>
				<Text>
					{ __(
						'Save the Global Styles changes as a theme variation.',
						'create-block-theme'
					) }
				</Text>
				<br />
				<TextControl
					label={ __( 'Variation name', 'create-block-theme' ) }
					value={ theme.name }
					onChange={ ( value ) =>
						setTheme( { ...theme, name: value } )
					}
				/>
				<br />
				<Button
					icon={ copy }
					variant="primary"
					onClick={ handleCreateVariationClick }
				>
					{ __( 'Create Theme Variation', 'create-block-theme' ) }
				</Button>
			</VStack>
		</PanelBody>
	);
};
