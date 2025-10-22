import { Given, When, Then } from '@cucumber/cucumber';
import { DataTable } from '@cucumber/cucumber';
import { sharedState } from './shared';

import axios from 'axios';
import { config } from '../config/env';
import assert from 'assert';

Given('the name is {string}', (inputName: string) => {
    sharedState.name = inputName === '<empty>' ? '' : inputName;
});

Given('the name is {string} and the country is {string}', (inputName: string, inputCountry: string) => {
    sharedState.name = inputName === '<empty>' ? '' : inputName;
    sharedState.country = inputCountry === '<empty>' ? '' : inputCountry;
});

Given('I have the following names:', (inputTable: DataTable) => {
    sharedState.names = inputTable.raw().slice(1).map(row => row[0]);
});

When('I send a GET request to estimate the age', async () => {
    const queryParams = new URLSearchParams();

    if (typeof sharedState.name !== 'undefined') {
        queryParams.append('name', sharedState.name);
    }

    if (sharedState.names.length !== 0) {
        sharedState.names.forEach(name => queryParams.append('name[]', name));
    }

    if (typeof sharedState.country !== 'undefined') {
        queryParams.append('country_id', sharedState.country);
    }

    const fullUrl = `${config.baseUrl}?${queryParams.toString()}`;
    console.log('Request URL = ' + fullUrl);

    const response = await axios.get(fullUrl, {
        validateStatus: () => true,
    });

    sharedState.responseData = response;

    console.log('Response Status = ' + response.status);
    console.log('ResponseData = ' + response.data.toString());
});

Then('the API response status code should be {int}', (expStatuscode: number) => {
    if (!sharedState.responseData) {
        throw new Error('Response data is undefined');
    }

    assert.strictEqual(
        sharedState.responseData.status,
        expStatuscode,
        `Expected status code ${expStatuscode}, but got ${sharedState.responseData.status}`
    );
});

Then('the response data should be a json object', () => {
    if (!sharedState.responseData) {
        throw new Error('Response data is undefined');
    }

    assert.strictEqual(typeof sharedState.responseData.data, 'object', 'Response data is not an object');
    assert.notStrictEqual(sharedState.responseData.data, null, 'Response data is null');
});

Then('the response should include the following data:', (inputTable: DataTable) => {
    const expectedData = inputTable.hashes()[0];

    if (!sharedState.responseData) {
        throw new Error('Response data is undefined');
    }

    const expectedName = expectedData.name === '<empty>' ? '' : expectedData.name;
    assert.strictEqual(
        sharedState.responseData.data.name,
        expectedName,
        `Expected name to be ${expectedName}, but got ${sharedState.responseData.data.name}`
    );

    let expectedAge: number | null;
    if (expectedData.age === 'null' || expectedData.age === '') {
        expectedAge = null;
    } else {
        expectedAge = Number(expectedData.age);
    }

    assert.strictEqual(
        sharedState.responseData.data.age,
        expectedAge,
        `Expected age to be ${expectedAge}, but got ${sharedState.responseData.data.age}`
    );

    assert.strictEqual(
        sharedState.responseData.data.count,
        Number(expectedData.count),
        `Expected count to be ${expectedData.count}, but got ${sharedState.responseData.data.count}`
    );

    if (Object.prototype.hasOwnProperty.call(expectedData, 'Country')) {
        const expectedCountry = expectedData.Country === 'null' ? null : expectedData.Country;
        assert.strictEqual(
            sharedState.responseData.data.country_id,
            expectedCountry,
            `Expected country_id to be ${expectedCountry}, but got ${sharedState.responseData.data.country_id}`
        )
    }
});

Then('the response should include the following estimated data:', (inputTable: DataTable) => {
    const expectedRows = inputTable.hashes();

    if (!sharedState.responseData) {
        throw new Error('Response data is undefined');
    }

    assert(Array.isArray(sharedState.responseData.data), 'Expected response to be an array');

    expectedRows.forEach(expected => {
        if (!sharedState.responseData) {
            throw new Error('Response data is undefined');
        }

        const actual = sharedState.responseData.data.find((item: any) => item.name === expected.Name);
        assert(actual, `Expected response to include data for name: ${expected.Name}`);

        const expectedCount = Number(expected.Count);
        const expectedAge = expected.Age === 'null' || expected.Age === '' ? null : Number(expected.Age);

        assert.strictEqual(
            actual.count,
            expectedCount,
            `Expected count for ${expected.Name} to be ${expectedCount}, but got ${actual.count}`
        );

        assert.strictEqual(
            actual.age,
            expectedAge,
            `Expected age for ${expected.Name} to be ${expectedAge}, but got ${actual.age}`
        );
    });
});


