export const VALUE_SLIDES_SEEN = 'VALUE_SLIDES_SEEN';

export interface SingleViewItemsState {
  seenValueSlides: boolean;
}

export interface ValueSlidesSeenAction {
  type: typeof VALUE_SLIDES_SEEN;
}

export type SingleViewItemsActions = ValueSlidesSeenAction;
