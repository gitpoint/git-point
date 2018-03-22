import React from 'react';
import { connect } from 'react-redux';
import { I18nProvider } from '@lingui/react';

class I18nLoader extends React.Component {
  props: {
    language: string,
    catalogs: Object,
    children: Array,
  };

  shouldComponentUpdate(nextProps) {
    return nextProps.language !== this.props.language;
  }

  render() {
    const { catalogs, children, language } = this.props;

    return (
      <I18nProvider language={language} catalogs={catalogs}>
        {children}
      </I18nProvider>
    );
  }
}

const mapStateToProps = state => ({
  language: state.auth.locale,
});

export default connect(mapStateToProps)(I18nLoader);
