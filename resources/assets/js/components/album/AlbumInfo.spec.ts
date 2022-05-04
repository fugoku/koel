import { beforeEach, expect, it } from 'vitest'
import { render } from '@/__tests__/__helpers__'
import { cleanup, fireEvent } from '@testing-library/vue'
import factory from '@/__tests__/factory'
import AlbumInfo from './AlbumInfo.vue'
import AlbumThumbnail from '@/components/ui/AlbumArtistThumbnail.vue'

beforeEach(() => cleanup())

it.each([['sidebar'], ['full']])('renders in %s mode', async (mode: string) => {
  const { getByTestId } = render(AlbumInfo, {
    props: {
      album: factory<Album>('album'),
      mode
    },
    global: {
      stubs: {
        AlbumThumbnail
      }
    }
  })

  getByTestId('album-artist-thumbnail')

  const element = getByTestId<HTMLElement>('album-info')
  expect(element.classList.contains(mode)).toBe(true)
})

it('triggers showing full wiki', async () => {
  const album = factory<Album>('album')

  const { getByText } = render(AlbumInfo, {
    props: {
      album
    }
  })

  await fireEvent.click(getByText('Full Wiki'))
  getByText(album.info!.wiki!.full)
})
