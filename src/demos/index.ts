import type {Demo} from '../demoTypes';
import {DEMOS_MINE} from './mine';
import {DEMOS_ACTION_INPUT} from './action-input';
import {DEMOS_CHOICE_FEEDBACK_OVERLAY} from './choice-feedback-overlay';
import {DEMOS_NAV_LAYOUT} from './nav-layout';
import {DEMOS_CONTAINER_CONTENT_DATA} from './container-content-data';

export const GROUP_DEMOS: Record<string, Demo> = {
  ...DEMOS_MINE,
  ...DEMOS_ACTION_INPUT,
  ...DEMOS_CHOICE_FEEDBACK_OVERLAY,
  ...DEMOS_NAV_LAYOUT,
  ...DEMOS_CONTAINER_CONTENT_DATA,
};
