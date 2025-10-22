module.exports = {
    default: [
        '--require-module ts-node/register',
        '--require cucumber_tests/step_definitions/*.steps.ts',
        '--require config/env.ts',
        '--format progress',
        'cucumber_tests/features/*.feature',
        '--format html:reports/cucumber-report.html'
    ].join(' ')
}