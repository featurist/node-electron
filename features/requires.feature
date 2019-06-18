Feature: Requires files before test run

  Background:
    Given the file "features/weather_report.feature" contains:
        """
        Feature: Weather Report
          Scenario: Checking the weather in London
            Given I am in London
            When I check the weather
            Then it should be rainy
        """
    And the file "setup.js" contains:
        """
        window.weatherReport = 'Rainy!'

        """
    And the file "features/step_definitions/steps.js" contains:
        """
        const { Given, When, Then } = require('cucumber')
        const assert = require('assert')

        Given(/^I am in London$/, function () {
          const element = document.createElement('div')
          element.id = 'weather'
          element.innerHTML = window.weatherReport
          document.body.appendChild(element)
        })

        When(/^I check the weather$/, function () {
          this.weatherElement = document.getElementById('weather')
        })

        Then(/^it should be rainy$/, function () {
          assert.equal('Rainy!', this.weatherElement.innerHTML)
        })
        """

  Scenario: Running a passing scenario with node.js and browser step definitions
    When I run `cucumber-electron`
    Then the process should exit with code 1

  Scenario: Debugging a scenario with node.js and browser step definitions
    When I run `cucumber-electron -r features/support/setup.js`
    Then the process should exit with code 0
