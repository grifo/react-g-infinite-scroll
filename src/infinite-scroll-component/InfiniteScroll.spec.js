import { render, fireEvent } from '@testing-library/react'

import InfiniteScroll from './InfiniteScroll'

describe('InfiniteScroll', () => {
  const TestComponent = ({ expectRef, fetchMore, ignoreScroll, offset }) => {
    return (
      <InfiniteScroll fetchMore={fetchMore} ignoreScroll={ignoreScroll} offset={offset} />
    )
  }

  const TestComponentWithRef = ({ expectRef, fetchMore, ignoreScroll, offset }) => {
    return (
      <InfiniteScroll
        expectRef
        fetchMore={fetchMore}
        ignoreScroll={ignoreScroll}
        offset={offset}
      >
        {ref =>
          <div data-testid="container" ref={ref} />
        }
      </InfiniteScroll>
    )
  }

  describe('In window with offset', () => {
    let fetchMoreMock
    let rerender
    let props

    beforeEach(() => {
      fetchMoreMock = jest.fn()
      props = {
        fetchMore: fetchMoreMock,
        offset: 20
      }

      global.innerHeight = 100
      Object.defineProperty(global.document, 'scrollingElement', {
        value: {
          scrollHeight: 200,
          scrollTop: 0
        },
        writable: true,
        configurable: true
      })

      rerender = render(<TestComponent {...props} />).rerender
    })

    it('Should not call fetchMore when scroll is before the limit', () => {
      Object.defineProperty(global.document.scrollingElement, 'scrollTop', {
        value: 79
      })
      fireEvent.scroll(global)
      expect(fetchMoreMock).not.toBeCalled()
    })

    it('Should call fetchMore when scroll to limit', () => {
      Object.defineProperty(global.document.scrollingElement, 'scrollTop', {
        value: 80
      })
      fireEvent.scroll(global)
      expect(fetchMoreMock).toBeCalled()
    })

    it('Should not call fetchMore when scroll to limit, but with ignoreScroll', () => {
      rerender(<TestComponent {...props} ignoreScroll />)
      Object.defineProperty(global.document.scrollingElement, 'scrollTop', {
        value: 80
      })
      fireEvent.scroll(global)
      expect(fetchMoreMock).not.toBeCalled()
    })

    it('Should call fetchMore when update ignoreScroll to false', () => {
      Object.defineProperty(global.document.scrollingElement, 'scrollTop', {
        value: 80
      })
      rerender(<TestComponent {...props} ignoreScroll />)
      rerender(<TestComponent {...props} />)
      expect(fetchMoreMock).toBeCalled()
    })
  })

  describe('In ref', () => {
    it('Should call fetchMore when scroll to limit', () => {
      const fetchMoreMock = jest.fn()

      const { getByTestId } = render(
        <TestComponentWithRef fetchMore={fetchMoreMock} />
      )

      const container = getByTestId('container')
      Object.defineProperties(container, {
        offsetHeight: {
          value: 100
        },
        scrollHeight: {
          value: 200
        },
        scrollTop: {
          value: 100
        }
      })

      fetchMoreMock.mockClear()
      fireEvent.scroll(container)
      expect(fetchMoreMock).toBeCalled()
    })

    it('Should remove event listener on unmount', () => {
      const { getByTestId, unmount } = render(
        <TestComponentWithRef fetchMore={jest.fn()} />
      )

      const container = getByTestId('container')
      const unmountMock = jest.fn()
      container.removeEventListener = unmountMock

      unmount()
      expect(unmountMock.mock.calls[0][0]).toBe('scroll')
    })
  })
})
