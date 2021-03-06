/* jshint ignore:start */
import React from 'react';
/* jshint ignore:end */

export default class Breadcrumb extends React.Component {
  constructor(props) {
    super(props);

    /** Gets the root level (/) */
    this.state = {'previous': '/'};
  }
  
  componentWillMount() {
    global.setBreadcrumbCurrentLevel = (path) => {
      this.setState({'previous': path});
    };
  }

  changeLevel(e) {
    e.preventDefault();

    /** Sets a path to open */
    global.setPath(e.currentTarget.getAttribute('data-path'), true);
  }

  render() {
    var path = this.state.previous;
    var pathsArr = path.split('/').filter(function (value) {return (value !== '');});
    var that = this;
    var tmp_path = '/';

    pathsArr.unshift('/');

    /* jshint ignore:start */
    return (
      <div className="breadcrumb-nav">
        {pathsArr.map(function (pathName, i) {

          tmp_path = (tmp_path.replace(/\/*$/, ''))+"/"+pathName;

          return(
              <div className="breadcrumb-link-outer">
                {(pathsArr.length-1 === i) ? <a href="#" data-path={tmp_path} id={i} className="breadcrumb-link" onClick={that.changeLevel.bind(that)}><span className="breadcrumb-selected">{pathName}</span></a> : <a href="#" data-path={tmp_path} id={i} className="breadcrumb-link" onClick={that.changeLevel.bind(that)}>{pathName}</a>} {((pathsArr.length > 1 && ((pathsArr.length-1) != i)) ? <span>&nbsp;>&nbsp;</span> : "")}
              </div>
          );
        })}

      </div>
    );
    /* jshint ignore:end */

  }
}