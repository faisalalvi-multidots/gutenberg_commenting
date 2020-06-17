(function (wpI18n, wpData, wpElement, wpCompose, wpEditPost, wpPlugins, wpComponents ) {
  const { withSelect, withDispatch } = wpData;
  const { PluginSidebar, PluginSidebarMoreMenuItem } = wpEditPost
  const { Component, Fragment } = wpElement;
  const { compose } = wpCompose;
  const { __ } = wpI18n;
  const { registerPlugin } = wpPlugins;
  const { ToggleControl } = wpComponents;
  let toogleFormatFlag = false;
  class SBSidebar extends Component {

    render() {
      // Nested object destructuring.
      const {
        meta: {
          sb_is_suggestion_mode: suggestionEnable,
        } = {},
        updateMeta,
      } = this.props;

      if ( toogleFormatFlag !== suggestionEnable ) {
        toogleFormatFlag = suggestionEnable;

        let parentElement = document.getElementById('editor');

        if (parentElement.classList) {
          parentElement.classList.toggle('suggestion-mode');
        } else {
          let classes = parentElement.className.split(' ');
          let index = classes.indexOf('suggestion-mode');
          if (index >= 0) {
            classes.splice(index, 1);
          } else {
            classes.push('suggestion-mode');
            parentElement.className = classes.join(' ');
          }
        }
      }

      return (
        <Fragment>
          <PluginSidebarMoreMenuItem
            name="suggestion-sidebar"
            type="sidebar"
            target="suggestion-sidebar"
          >
            { __( 'Edit Mode', 'suggestion_block' ) }
          </PluginSidebarMoreMenuItem>
          <PluginSidebar
            name="suggestion-sidebar"
            title={ __( 'Edit Mode', 'suggestion_block' ) }
            icon="welcome-write-blog"
          >
            <ToggleControl
              label={__('Suggestion mode')}
              className="suggestion-toggle"
              checked={suggestionEnable}
              onChange={( value ) => {
                updateMeta( { sb_is_suggestion_mode:  value } );
              }}
            />
          </PluginSidebar>
        </Fragment>
      );
    }
  }

// Fetch the post meta.
  const applyWithSelect = withSelect( ( select ) => {
    const { getEditedPostAttribute } = select( 'core/editor' );

    return {
      meta: getEditedPostAttribute( 'meta' ),
    };
  } );

// Provide method to update post meta.
  const applyWithDispatch = withDispatch( ( dispatch, { meta } ) => {
    const { editPost } = dispatch( 'core/editor' );

    return {
      updateMeta( newMeta ) {
        editPost( { meta: Object.assign({}, meta, newMeta) } );
      },
    };
  } );

// Combine the higher-order components.
  const render = compose( [
    applyWithSelect,
    applyWithDispatch
  ] )( SBSidebar );

  registerPlugin( 'suggestion-sidebar', {
    render: render
  } );


})( wp.i18n, wp.data, wp.element, wp.compose, wp.editPost, wp.plugins, wp.components);
