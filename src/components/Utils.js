/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */


export async function makeRequest(instance, url) {
  let data;

  try {
    data = await instance.get(url);
  } catch (err) {
    console.error(err);
  }

  return data;
}

export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export function between(num, min, max) {
  return num >= min && num <= max;
}
