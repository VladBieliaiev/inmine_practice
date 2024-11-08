/**
 * Horizontal rotation in degree.
 */
export type Yaw = number;

export type YawAsDirectionSimple = 'North' | 'South' | 'East' | 'West';

export type YawAsDirection =
  | YawAsDirectionSimple
  | 'South_East'
  | 'South_West'
  | 'North_West'
  | 'North_East';
