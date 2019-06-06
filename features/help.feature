Feature: Help
  Scenario: Running the CLI with --help
    When I run `node-electron --help`
    Then stdout should include "Usage: node-electron"
    And stdout should include "--interactive"
    And stdout should include "--require"
    And stdout should include "command"
