//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v11.0.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming
import * as Types from '../axios-client';
import { useQuery, useMutation } from '@tanstack/react-query';
import type { UseQueryResult, QueryFunctionContext, UseQueryOptions, QueryClient, QueryKey, MutationKey, UseMutationOptions, UseMutationResult, QueryMeta, MutationMeta } from '@tanstack/react-query';
import { trimArrayEnd, isParameterObject, getBaseUrl, addMetaToOptions  } from './helpers';
import type { QueryMetaContextValue } from 'react-query-swagger';
import { QueryMetaContext } from 'react-query-swagger';
import { useContext } from 'react';
import { TwitchClient as TwitchClientClass } from '../axios-client';
import { createClient, getClientFactory } from './helpers';

export const Client = () => getClientFactory()(TwitchClientClass);
import type { AxiosRequestConfig } from 'axios';

export type VtubersTwitchQueryParameters = {
  cursor: string | undefined;
};

export type EmotesTwitchQueryParameters = {
  broadcasterId: number | undefined;
};

export type ClipsTwitchQueryParameters = {
  broadcasterId: number | undefined;
};

    
export function vtubersUrl(cursor: string | undefined): string {
  let url_ = getBaseUrl() + "/api/Twitch/vtubers?";
if (cursor === null)
    throw new Error("The parameter 'cursor' cannot be null.");
else if (cursor !== undefined)
    url_ += "cursor=" + encodeURIComponent("" + cursor) + "&";
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

let vtubersDefaultOptions: UseQueryOptions<Types.DTStreamData, unknown, Types.DTStreamData> = {
  queryFn: __vtubers,
};
export function getVtubersDefaultOptions(): UseQueryOptions<Types.DTStreamData, unknown, Types.DTStreamData> {
  return vtubersDefaultOptions;
};
export function setVtubersDefaultOptions(options: UseQueryOptions<Types.DTStreamData, unknown, Types.DTStreamData>) {
  vtubersDefaultOptions = options;
}

export function vtubersQueryKey(cursor: string | undefined): QueryKey;
export function vtubersQueryKey(...params: any[]): QueryKey {
  if (params.length === 1 && isParameterObject(params[0])) {
    const { cursor,  } = params[0] as VtubersTwitchQueryParameters;

    return trimArrayEnd([
        'TwitchClient',
        'vtubers',
        cursor as any,
      ]);
  } else {
    return trimArrayEnd([
        'TwitchClient',
        'vtubers',
        ...params
      ]);
  }
}
function __vtubers(context: QueryFunctionContext) {
  return Client().vtubers(
      context.queryKey[2] as string | undefined    );
}

export function useVtubersQuery<TSelectData = Types.DTStreamData, TError = unknown>(dto: VtubersTwitchQueryParameters, options?: UseQueryOptions<Types.DTStreamData, TError, TSelectData>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
/**
 * @param cursor (optional) 
 * @return Success
 */
export function useVtubersQuery<TSelectData = Types.DTStreamData, TError = unknown>(cursor: string | undefined, options?: UseQueryOptions<Types.DTStreamData, TError, TSelectData>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
export function useVtubersQuery<TSelectData = Types.DTStreamData, TError = unknown>(...params: any []): UseQueryResult<TSelectData, TError> {
  let options: UseQueryOptions<Types.DTStreamData, TError, TSelectData> | undefined = undefined;
  let axiosConfig: AxiosRequestConfig |undefined;
  let cursor: any = undefined;
  
  if (params.length > 0) {
    if (isParameterObject(params[0])) {
      ({ cursor,  } = params[0] as VtubersTwitchQueryParameters);
      options = params[1];
      axiosConfig = params[2];
    } else {
      [cursor, options, axiosConfig] = params;
    }
  }

  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  if (axiosConfig) {
    options = options ?? { } as any;
    options!.meta = { ...options!.meta, axiosConfig };
  }

  return useQuery<Types.DTStreamData, TError, TSelectData>({
    queryFn: __vtubers,
    queryKey: vtubersQueryKey(cursor),
    ...vtubersDefaultOptions as unknown as UseQueryOptions<Types.DTStreamData, TError, TSelectData>,
    ...options,
  });
}
/**
 * @param cursor (optional) 
 * @return Success
 */
export function setVtubersData(queryClient: QueryClient, updater: (data: Types.DTStreamData | undefined) => Types.DTStreamData, cursor: string | undefined) {
  queryClient.setQueryData(vtubersQueryKey(cursor),
    updater
  );
}

/**
 * @param cursor (optional) 
 * @return Success
 */
export function setVtubersDataByQueryId(queryClient: QueryClient, queryKey: QueryKey, updater: (data: Types.DTStreamData | undefined) => Types.DTStreamData) {
  queryClient.setQueryData(queryKey, updater);
}
    
    
export function emotesUrl(broadcasterId: number | undefined): string {
  let url_ = getBaseUrl() + "/api/Twitch/emotes?";
if (broadcasterId === null)
    throw new Error("The parameter 'broadcasterId' cannot be null.");
else if (broadcasterId !== undefined)
    url_ += "broadcasterId=" + encodeURIComponent("" + broadcasterId) + "&";
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

let emotesDefaultOptions: UseQueryOptions<Types.DTStreamerEmotes, unknown, Types.DTStreamerEmotes> = {
  queryFn: __emotes,
};
export function getEmotesDefaultOptions(): UseQueryOptions<Types.DTStreamerEmotes, unknown, Types.DTStreamerEmotes> {
  return emotesDefaultOptions;
};
export function setEmotesDefaultOptions(options: UseQueryOptions<Types.DTStreamerEmotes, unknown, Types.DTStreamerEmotes>) {
  emotesDefaultOptions = options;
}

export function emotesQueryKey(broadcasterId: number | undefined): QueryKey;
export function emotesQueryKey(...params: any[]): QueryKey {
  if (params.length === 1 && isParameterObject(params[0])) {
    const { broadcasterId,  } = params[0] as EmotesTwitchQueryParameters;

    return trimArrayEnd([
        'TwitchClient',
        'emotes',
        broadcasterId as any,
      ]);
  } else {
    return trimArrayEnd([
        'TwitchClient',
        'emotes',
        ...params
      ]);
  }
}
function __emotes(context: QueryFunctionContext) {
  return Client().emotes(
      context.queryKey[2] as number | undefined    );
}

export function useEmotesQuery<TSelectData = Types.DTStreamerEmotes, TError = unknown>(dto: EmotesTwitchQueryParameters, options?: UseQueryOptions<Types.DTStreamerEmotes, TError, TSelectData>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
/**
 * @param broadcasterId (optional) 
 * @return Success
 */
export function useEmotesQuery<TSelectData = Types.DTStreamerEmotes, TError = unknown>(broadcasterId: number | undefined, options?: UseQueryOptions<Types.DTStreamerEmotes, TError, TSelectData>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
export function useEmotesQuery<TSelectData = Types.DTStreamerEmotes, TError = unknown>(...params: any []): UseQueryResult<TSelectData, TError> {
  let options: UseQueryOptions<Types.DTStreamerEmotes, TError, TSelectData> | undefined = undefined;
  let axiosConfig: AxiosRequestConfig |undefined;
  let broadcasterId: any = undefined;
  
  if (params.length > 0) {
    if (isParameterObject(params[0])) {
      ({ broadcasterId,  } = params[0] as EmotesTwitchQueryParameters);
      options = params[1];
      axiosConfig = params[2];
    } else {
      [broadcasterId, options, axiosConfig] = params;
    }
  }

  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  if (axiosConfig) {
    options = options ?? { } as any;
    options!.meta = { ...options!.meta, axiosConfig };
  }

  return useQuery<Types.DTStreamerEmotes, TError, TSelectData>({
    queryFn: __emotes,
    queryKey: emotesQueryKey(broadcasterId),
    ...emotesDefaultOptions as unknown as UseQueryOptions<Types.DTStreamerEmotes, TError, TSelectData>,
    ...options,
  });
}
/**
 * @param broadcasterId (optional) 
 * @return Success
 */
export function setEmotesData(queryClient: QueryClient, updater: (data: Types.DTStreamerEmotes | undefined) => Types.DTStreamerEmotes, broadcasterId: number | undefined) {
  queryClient.setQueryData(emotesQueryKey(broadcasterId),
    updater
  );
}

/**
 * @param broadcasterId (optional) 
 * @return Success
 */
export function setEmotesDataByQueryId(queryClient: QueryClient, queryKey: QueryKey, updater: (data: Types.DTStreamerEmotes | undefined) => Types.DTStreamerEmotes) {
  queryClient.setQueryData(queryKey, updater);
}
    
    
export function clipsUrl(broadcasterId: number | undefined): string {
  let url_ = getBaseUrl() + "/api/Twitch/clips?";
if (broadcasterId === null)
    throw new Error("The parameter 'broadcasterId' cannot be null.");
else if (broadcasterId !== undefined)
    url_ += "broadcasterId=" + encodeURIComponent("" + broadcasterId) + "&";
  url_ = url_.replace(/[?&]$/, "");
  return url_;
}

let clipsDefaultOptions: UseQueryOptions<Types.DTTwitchClip[], unknown, Types.DTTwitchClip[]> = {
  queryFn: __clips,
};
export function getClipsDefaultOptions(): UseQueryOptions<Types.DTTwitchClip[], unknown, Types.DTTwitchClip[]> {
  return clipsDefaultOptions;
};
export function setClipsDefaultOptions(options: UseQueryOptions<Types.DTTwitchClip[], unknown, Types.DTTwitchClip[]>) {
  clipsDefaultOptions = options;
}

export function clipsQueryKey(broadcasterId: number | undefined): QueryKey;
export function clipsQueryKey(...params: any[]): QueryKey {
  if (params.length === 1 && isParameterObject(params[0])) {
    const { broadcasterId,  } = params[0] as ClipsTwitchQueryParameters;

    return trimArrayEnd([
        'TwitchClient',
        'clips',
        broadcasterId as any,
      ]);
  } else {
    return trimArrayEnd([
        'TwitchClient',
        'clips',
        ...params
      ]);
  }
}
function __clips(context: QueryFunctionContext) {
  return Client().clips(
      context.queryKey[2] as number | undefined    );
}

export function useClipsQuery<TSelectData = Types.DTTwitchClip[], TError = unknown>(dto: ClipsTwitchQueryParameters, options?: UseQueryOptions<Types.DTTwitchClip[], TError, TSelectData>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
/**
 * @param broadcasterId (optional) 
 * @return Success
 */
export function useClipsQuery<TSelectData = Types.DTTwitchClip[], TError = unknown>(broadcasterId: number | undefined, options?: UseQueryOptions<Types.DTTwitchClip[], TError, TSelectData>, axiosConfig?: Partial<AxiosRequestConfig>): UseQueryResult<TSelectData, TError>;
export function useClipsQuery<TSelectData = Types.DTTwitchClip[], TError = unknown>(...params: any []): UseQueryResult<TSelectData, TError> {
  let options: UseQueryOptions<Types.DTTwitchClip[], TError, TSelectData> | undefined = undefined;
  let axiosConfig: AxiosRequestConfig |undefined;
  let broadcasterId: any = undefined;
  
  if (params.length > 0) {
    if (isParameterObject(params[0])) {
      ({ broadcasterId,  } = params[0] as ClipsTwitchQueryParameters);
      options = params[1];
      axiosConfig = params[2];
    } else {
      [broadcasterId, options, axiosConfig] = params;
    }
  }

  const metaContext = useContext(QueryMetaContext);
  options = addMetaToOptions(options, metaContext);
  if (axiosConfig) {
    options = options ?? { } as any;
    options!.meta = { ...options!.meta, axiosConfig };
  }

  return useQuery<Types.DTTwitchClip[], TError, TSelectData>({
    queryFn: __clips,
    queryKey: clipsQueryKey(broadcasterId),
    ...clipsDefaultOptions as unknown as UseQueryOptions<Types.DTTwitchClip[], TError, TSelectData>,
    ...options,
  });
}
/**
 * @param broadcasterId (optional) 
 * @return Success
 */
export function setClipsData(queryClient: QueryClient, updater: (data: Types.DTTwitchClip[] | undefined) => Types.DTTwitchClip[], broadcasterId: number | undefined) {
  queryClient.setQueryData(clipsQueryKey(broadcasterId),
    updater
  );
}

/**
 * @param broadcasterId (optional) 
 * @return Success
 */
export function setClipsDataByQueryId(queryClient: QueryClient, queryKey: QueryKey, updater: (data: Types.DTTwitchClip[] | undefined) => Types.DTTwitchClip[]) {
  queryClient.setQueryData(queryKey, updater);
}