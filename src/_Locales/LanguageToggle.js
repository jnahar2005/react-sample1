import React from 'react';
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { withLocalize} from 'react-localize-redux';
import { renderToStaticMarkup } from 'react-dom/server';
import globalTranslations from './translations/en.json';

 const languages = [
                    { name: 'English', code: 'en' }, 
                    { name: 'Hindi', code: 'hi' }                        
                  ];

class LanguageToggle extends React.Component<any, any> {
    constructor(props) {
      super(props); 
      const defaultLanguage = (window.localStorage.getItem("languageCode")!== null)?
          window.localStorage.getItem("languageCode"):languages[0].code; 
      this.props.initialize({
        languages,
        translation: globalTranslations,
        options: { 
                  renderToStaticMarkup,
                  renderInnerHtml: true,
                  defaultLanguage
                }
      });     
      this.state = {
        isUsingRedux:window.localStorage.getItem("languageCode")  
      }
      
      let  translations = require(`./translations/${defaultLanguage}.json`);
      let {addTranslationForLanguage} = this.props;
      addTranslationForLanguage(translations, defaultLanguage);
    };
  
 
  componentDidUpdate(prevProps, prevState) {
      let {activeLanguage,addTranslationForLanguage} = this.props

      const curLangCode = activeLanguage && activeLanguage.code;      
      const hasActiveLanguageChanged = prevProps.activeLanguage !== activeLanguage;
      if(hasActiveLanguageChanged) {
          window.localStorage.setItem("languageCode", curLangCode);
          this.setState = ({
              isUsingRedux: window.localStorage.getItem("languageCode")
          });
          let  translations = require(`./translations/${curLangCode}.json`);
          addTranslationForLanguage(translations, curLangCode);  
      }
  }

  render() { 
    let {setActiveLanguage} = this.props;

    function setLang(e){
      setActiveLanguage(e.target.value);
    }
    const getClass = (languageCode) => {
      return languageCode === this.state.isUsingRedux ? 'active' : ''
    };
    return (
      <select className="selector lang-action form-control" onChange={e=>setLang(e)}>
        {languages.map(lang => 
          <option className={getClass(lang.code)} value={lang.code} selected={getClass(lang.code)}>{ lang.name }</option>
        )}
      </select>
    );
  }
}

function mapStateToProps(state) {
  return state
}
export default withLocalize(withRouter(connect(mapStateToProps)(LanguageToggle)));


