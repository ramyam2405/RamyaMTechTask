import { Before } from '@cucumber/cucumber';
import { sharedState } from './shared';

Before(() => {
    sharedState.name = undefined;
    sharedState.country = undefined;
    sharedState.responseData = undefined;
    sharedState.names = [];
});