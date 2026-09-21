'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import type { MeetingFormState } from '@/lib/definitions';

type MeetingFormProps = {
  action: (prevState: MeetingFormState, formData: FormData) => Promise<MeetingFormState>;
  submitLabel: string;
  defaultValues?: {
    date: string;
    meetingType: string;
    presiding: string;
    conducting: string;
    openingHymnNumber: number;
    openingHymnTitle: string;
    openingPrayer: string;
    sacramentHymnNumber: number;
    sacramentHymnTitle: string;
    closingHymnNumber: number;
    closingHymnTitle: string;
    closingPrayer: string;
    stakeBusiness: boolean;
    announcements: string;
    wardBusiness: string;
    speakers: string;
  };
};

const initialState: MeetingFormState = {};

export default function MeetingForm({ action, submitLabel, defaultValues }: MeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  // React clears uncontrolled fields after every action call. Bumping this key
  // remounts the form (and its inputs) so `v` below is re-applied as each
  // input's defaultValue, making what the user typed reappear after an error.
  const [resetKey, setResetKey] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setResetKey((k) => k + 1);
  }, [state]);

  const v = {
    date: state.values?.date ?? defaultValues?.date ?? '',
    meetingType: state.values?.meetingType ?? defaultValues?.meetingType ?? '',
    presiding: state.values?.presiding ?? defaultValues?.presiding ?? '',
    conducting: state.values?.conducting ?? defaultValues?.conducting ?? '',
    openingHymnNumber: state.values?.openingHymnNumber ?? String(defaultValues?.openingHymnNumber ?? ''),
    openingHymnTitle: state.values?.openingHymnTitle ?? defaultValues?.openingHymnTitle ?? '',
    openingPrayer: state.values?.openingPrayer ?? defaultValues?.openingPrayer ?? '',
    sacramentHymnNumber: state.values?.sacramentHymnNumber ?? String(defaultValues?.sacramentHymnNumber ?? ''),
    sacramentHymnTitle: state.values?.sacramentHymnTitle ?? defaultValues?.sacramentHymnTitle ?? '',
    closingHymnNumber: state.values?.closingHymnNumber ?? String(defaultValues?.closingHymnNumber ?? ''),
    closingHymnTitle: state.values?.closingHymnTitle ?? defaultValues?.closingHymnTitle ?? '',
    closingPrayer: state.values?.closingPrayer ?? defaultValues?.closingPrayer ?? '',
    stakeBusiness: state.values?.stakeBusiness
      ? state.values.stakeBusiness === 'true'
      : defaultValues?.stakeBusiness ?? false,
    announcements: state.values?.announcements ?? defaultValues?.announcements ?? '',
    wardBusiness: state.values?.wardBusiness ?? defaultValues?.wardBusiness ?? '',
    speakers: state.values?.speakers ?? defaultValues?.speakers ?? '',
  };

  return (
    <form action={formAction} key={resetKey} className="max-w-2xl space-y-6">
      {state.message && (
        <p className="rounded-md bg-red-50 p-3 text-sm text-red-700" role="alert">
          {state.message}
        </p>
      )}

      <Field id="date" label="Date" type="date" defaultValue={v.date} errors={state.errors?.date} />

      <div>
        <label htmlFor="meetingType" className="block text-sm font-medium text-gray-700">
          Meeting Type
        </label>
        <select
          id="meetingType"
          name="meetingType"
          defaultValue={v.meetingType}
          aria-describedby="meetingType-error"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="" disabled>Select a type</option>
          <option value="regular">Regular</option>
          <option value="testimony">Testimony</option>
          <option value="stake">Stake</option>
          <option value="general">General</option>
        </select>
        <div id="meetingType-error" aria-live="polite" className="mt-1 text-sm text-red-600">
          {state.errors?.meetingType?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <Field id="presiding" label="Presiding" defaultValue={v.presiding} errors={state.errors?.presiding} />
      <Field id="conducting" label="Conducting" defaultValue={v.conducting} errors={state.errors?.conducting} />

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">Opening</legend>
        <div className="grid grid-cols-2 gap-4">
          <Field id="openingHymnNumber" label="Opening Hymn #" type="number" defaultValue={v.openingHymnNumber} errors={state.errors?.openingHymnNumber} />
          <Field id="openingHymnTitle" label="Opening Hymn Title" defaultValue={v.openingHymnTitle} errors={state.errors?.openingHymnTitle} />
        </div>
        <Field id="openingPrayer" label="Opening Prayer" defaultValue={v.openingPrayer} errors={state.errors?.openingPrayer} />
      </fieldset>

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">Sacrament</legend>
        <div className="grid grid-cols-2 gap-4">
          <Field id="sacramentHymnNumber" label="Sacrament Hymn #" type="number" defaultValue={v.sacramentHymnNumber} errors={state.errors?.sacramentHymnNumber} />
          <Field id="sacramentHymnTitle" label="Sacrament Hymn Title" defaultValue={v.sacramentHymnTitle} errors={state.errors?.sacramentHymnTitle} />
        </div>
      </fieldset>

      <div>
        <label htmlFor="speakers" className="block text-sm font-medium text-gray-700">
          Speakers (one per line, format: Name | Topic)
        </label>
        <textarea
          id="speakers"
          name="speakers"
          rows={4}
          defaultValue={v.speakers}
          aria-describedby="speakers-error"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <div id="speakers-error" aria-live="polite" className="mt-1 text-sm text-red-600">
          {state.errors?.speakers?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="wardBusiness" className="block text-sm font-medium text-gray-700">
          Ward Business (one item per line)
        </label>
        <textarea
          id="wardBusiness"
          name="wardBusiness"
          rows={3}
          defaultValue={v.wardBusiness}
          aria-describedby="wardBusiness-error"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <div id="wardBusiness-error" aria-live="polite" className="mt-1 text-sm text-red-600">
          {state.errors?.wardBusiness?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          value="true"
          defaultChecked={v.stakeBusiness}
          aria-describedby="stakeBusiness-error"
          className="h-4 w-4 rounded border-gray-300"
        />
        <label htmlFor="stakeBusiness" className="text-sm font-medium text-gray-700">
          Stake Business
        </label>
      </div>
      <div id="stakeBusiness-error" aria-live="polite" className="text-sm text-red-600">
        {state.errors?.stakeBusiness?.map((msg) => <p key={msg}>{msg}</p>)}
      </div>

      <div>
        <label htmlFor="announcements" className="block text-sm font-medium text-gray-700">
          Announcements (one per line)
        </label>
        <textarea
          id="announcements"
          name="announcements"
          rows={3}
          defaultValue={v.announcements}
          aria-describedby="announcements-error"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
        <div id="announcements-error" aria-live="polite" className="mt-1 text-sm text-red-600">
          {state.errors?.announcements?.map((msg) => <p key={msg}>{msg}</p>)}
        </div>
      </div>

      <fieldset className="rounded-md border border-gray-200 p-4">
        <legend className="px-1 text-sm font-medium text-gray-700">Closing</legend>
        <div className="grid grid-cols-2 gap-4">
          <Field id="closingHymnNumber" label="Closing Hymn #" type="number" defaultValue={v.closingHymnNumber} errors={state.errors?.closingHymnNumber} />
          <Field id="closingHymnTitle" label="Closing Hymn Title" defaultValue={v.closingHymnTitle} errors={state.errors?.closingHymnTitle} />
        </div>
        <Field id="closingPrayer" label="Closing Prayer" defaultValue={v.closingPrayer} errors={state.errors?.closingPrayer} />
      </fieldset>

      <button
        type="submit"
        disabled={isPending}
        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  type = 'text',
  defaultValue,
  errors,
}: {
  id: string;
  label: string;
  type?: string;
  defaultValue?: string | number;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        defaultValue={defaultValue}
        aria-describedby={`${id}-error`}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
      />
      <div id={`${id}-error`} aria-live="polite" className="mt-1 text-sm text-red-600">
        {errors?.map((msg) => <p key={msg}>{msg}</p>)}
      </div>
    </div>
  );
}