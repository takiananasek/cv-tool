import { signalStore, withState } from '@ngrx/signals';
import { ResumeComponentModel } from '../models/resume.model';
import { InjectionToken } from '@angular/core';

type ResumeState = {
    ownerId: number | null;
    profileImageMetadataId: string |null;
    backgroundImageMetadataId : string |null;
    title: string | null;
    components: ResumeComponentModel[];
};

const initialState: ResumeState = {
    profileImageMetadataId: null,
    backgroundImageMetadataId: null,
    title: null,
    ownerId: null,
    components: [],
  };

export const ResumeStore = signalStore(
  withState(initialState)
);

export const BooksStore = signalStore(
    { providedIn: 'root' },
    withState(initialState)
  );
