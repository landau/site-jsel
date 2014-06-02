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

var app = React.createClass({
  getInitialState: function() {
    return {
      json: JSON.stringify(defaultJSON, null, ' '),
      xpath: '//*',
      method: 'selectAll'
    };
  },

  onChange: function(e) {
    var s = {};
    s[e.target.name] = e.target.value;
    this.setState(s);
  },

  format: function() {
    try {
      this.setState({
        json: JSON.stringify(JSON.parse(this.state.json), null, ' ')
      });
    } catch(e) {}
  },

  render: function() {
    var err = null;
    var parsed = null;
    var output = null;
    try {
      parsed = JSON.parse(this.state.json);
      output = jsel(parsed)[this.state.method](this.state.xpath);
    } catch (e) {
      err = e;
    }

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
              placeholder: 'xpath',
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
              onChange: this.onChange,
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
            onChange: this.onChange,
            value: this.state.json
          })
          /*jshint indent:2 */
        ),
        dom.div(
          { className: 'col-md-6 output' },
          dom.pre(null, err ? err.message : JSON.stringify(output, null, ' ')))
      )
    );
  }
});

React.renderComponent(app(null), document.getElementById('app'));
