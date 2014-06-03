/*jshint esnext: true*/
'use strict';

var React = require('react');
var dom = React.DOM;
var jsel = require('jsel');


var defaultJSON = {
  name: {
    first: 'Lloyd',
    last: 'Hilaiel'
  },
  favoriteColor: 'yellow',
  languagesSpoken: [
    {
      lang: 'Bulgarian',
      level: 'advanced'
    },
    {
      lang: 'English',
      level: 'native',
      preferred: true
    },
    {
      lang: 'Spanish',
      level: 'beginner'
    }
  ],
  seatingPreference: [
    'window',
    'aisle'
  ],
  drinkPreference: [
    'whiskey',
    'beer',
    'wine'
  ],
  weight: 156
};

window.json = defaultJSON;
window.jsel = jsel;

var app = React.createClass({
  getInitialState: function() {
    return {
      json: JSON.stringify(defaultJSON, null, ' '),
      xpath: '//*',
      method: 'selectAll',
      output: jsel(defaultJSON).selectAll('//*'),
      err: null
    };
  },

  onChange: function(e) {
    var s = {};
    s[e.target.name] = e.target.value;

    this.setState(s);
  },

  updateXPath: function(e) {
    try {
      var xpath = e.target.value;

      this.setState({
        xpath: xpath,
        output: jsel(JSON.parse(this.state.json))[this.state.method](xpath),
        err: null
      });
    } catch(err) {
      this.setState({
        xpath: e.target.value,
        err: err
      });
    }
  },

  updateJSON: function(e) {
    try {
      var json = JSON.parse(e.target.value);

      this.setState({
        json: JSON.stringify(json, null, ' '), // keeps json pretty
        output: jsel(json)[this.state.method](this.state.xpath),
        err: null
      });
    } catch(err) {
      this.setState({
        json: e.target.value,
        err: err
      });
    }
  },

  format: function() {
    try {
      var json = JSON.parse(this.state.json);

      this.setState({
        json: JSON.stringify(json, null, ' ') // keeps json pretty
      });
    } catch(err) {
      this.setState({ err: err });
    }
  },

  render: function() {

    return dom.div(
      { className: 'container-fluid' },
      // Input
      dom.div(
        { className: 'row' },
        dom.div(
          { className: 'col-md-12' },
          dom.h2(null, 'jsel'),

          dom.div(
            { className: 'form-group' },

            /*jshint indent:false */
            dom.label({ htmlFor: 'method' }, 'Method: '),
            dom.select({
              className: 'form-control',
              type: 'select',
              onChange: this.onChange,
              value: this.state.method,
              name: 'method'
            },
            dom.option({ value: 'selectAll' }, 'selectAll'),
            dom.option({ value: 'select' }, 'select')),

            dom.br(),
            dom.input({
              className: 'form-control',
              type: 'text',
              placeholder: 'xpath',
              onChange: this.updateXPath,
              value: this.state.xpath,
              name: 'xpath'
            })
            /*jshint indent:2 */
          )
        )
      ),

      // Output
      dom.div(
        { className: 'row' },
        dom.div(
          { className: 'col-md-6' },
          dom.button({ className: 'btn btn-sm btn-primary', onClick: this.format }, 'Format'),
          dom.textarea({
            /*jshint indent:false */
            className: 'form-control',
            name:'json',
            onChange: this.updateJSON,
            value: this.state.json
          })
          /*jshint indent:2 */
        ),
        dom.div(
          { className: 'col-md-6 output' },
          dom.pre(null, this.state.err ? this.state.err.message : JSON.stringify(this.state.output, null, ' ')))
      )
    );
  }
});

React.renderComponent(app(null), document.getElementById('app'));
