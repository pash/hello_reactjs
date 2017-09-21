// complicated data selection or manipulation
// can be broken down to different files
// option to Reselect to memoize functions so that function will only rerun when it gets new parameters

export function authorsFormmattedForDropdown(authors) {
  return authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });
}
