import {createAction} from '@ngrx/store';

export enum LayoutActionTypes {
  OpenSidenav = '[Layout] Open Sidenav',
  CloseSidenav = '[Layout] Close Sidenav',
  ToggleSidenav = '[Layout] Toggle Sidenav'
}

export const openSidenav = createAction(LayoutActionTypes.OpenSidenav);
export const closeSidenav = createAction(LayoutActionTypes.CloseSidenav);
export const toggleSidenav = createAction(LayoutActionTypes.ToggleSidenav);
