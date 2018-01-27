
export const HO_UPDATE = (feed) =>
  (n, { render, state }) =>
    render({ done: 'fetching' }, () =>
      state('posts', true)
      .then((posts) => feed(posts))
      .then(({ posts, done }) => render({ posts, done }))
    )