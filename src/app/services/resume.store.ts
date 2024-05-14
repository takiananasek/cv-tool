import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ResumeComponentModel } from '../models/resume.model';

type ResumeState = {
  ownerId: number | null;
  profileImageMetadataName: string | null;
  backgroundImageMetadataName: string | null;
  title: string | null;
  components: ResumeComponentModel[];
};

const initialState: ResumeState = {
  profileImageMetadataName: null,
  backgroundImageMetadataName: null,
  title: null,
  ownerId: null,
  components: [],
};

export const ResumeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    updateProfileIMageMetadataName(profileImageMetadataName: string | null): void {
      patchState(store, { profileImageMetadataName });
    },
    updateBackgroundImageMetadataName(backgroundImageMetadataName: string | null): void {
      patchState(store, (state) => ({ backgroundImageMetadataName }));
    },
    updateTitle(title: string): void {
      patchState(store, (state) => ({ title }));
    },
    addComponent(component: ResumeComponentModel): void {
      patchState(store, (state) => ({
        ...state,
        components: [...store.components(), component],
      }));
    },
    deleteComponent(componentId: number): void {
      patchState(store, (state) => ({
        components: [
          ...store
            .components()
            .filter((c) => c.componentDocumentId != componentId),
        ],
      }));
    },
  }))
);
