// import React from 'react';
import axios from 'axios';
import qs from 'qs';

import { FETCH_JOBS, LIKE_JOB, DISMISS_JOB, CLEAR_LIKED_JOBS } from './types';

const INDEED_API_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const POSTCODE_API_ROOT_URL = 'https://api.postcodes.io/postcodes?';
const JOB_QUERY_PARAMS = {
  publisher: '4201738803816157',
  format: 'json',
  v: '2',
  latlong: 1
};

const buildJobsUrl = (location, jobSearchText) => {
  const isLisbon = (location === "lisbon");
  const country = isLisbon ? "pt" : "uk";
  const radius = isLisbon ? 25 : 15;
  const query = qs.stringify({
    ...JOB_QUERY_PARAMS, co: country, radius, l: location, q: jobSearchText
  });
  return `${INDEED_API_ROOT_URL}${query}`;
};
const buildPostcodeUrl = (region) => {
  const { longitude, latitude } = region;
  const query = qs.stringify({ lon: longitude, lat: latitude });
  return `${POSTCODE_API_ROOT_URL}${query}`;
};

export const fetchJobs = (state, callback) => async (dispatch) => {
  const { region, jobSearchText } = state;
  try {
    if (region.latitude > 49) {
      const postcodeUrl = buildPostcodeUrl(region);
      let { data: { result } } = await axios.get(postcodeUrl);
      if (result) {
        const { postcode } = result[0];
        const url = buildJobsUrl(postcode, jobSearchText);
        let { data } = await axios.get(url);
        dispatch({ type: FETCH_JOBS, payload: data });
      }
    } else {
      const url = buildJobsUrl("lisbon", jobSearchText);
      let { data } = await axios.get(url);
      dispatch({ type: FETCH_JOBS, payload: data });
    }
  } catch (e) {
    console.error(e);
  }
  return callback();
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const dismissJob = (job) => {
  return {
    payload: job,
    type: DISMISS_JOB
  };
};

export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
