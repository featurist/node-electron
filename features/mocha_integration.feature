Feature: Mocha integratoin

  Background:
    Given the file "test/weatherSpec.js" contains:
        """
        const assert = require('assert')
        describe('weather report', () => {
          it('checks the weather in London', () => {
            const element = document.createElement('div')
            element.id = 'weather'
            element.innerHTML = 'Rainy!'
            document.body.appendChild(element)

            const weatherElement = document.getElementById('weather')

            assert.equal('Rainy!', weatherElement.innerHTML)
          })
        })
        """

  Scenario: Running a passing scenario with node.js and browser step definitions
    When I run `mocha-electron`
    Then the process should exit with code 0

  Scenario: Debugging a scenario with node.js and browser step definitions
    When I run `mocha-electron --interactive`
    Then the process should not exit
