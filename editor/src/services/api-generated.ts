/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum BlockSide {
  Left = 'Left',
  Right = 'Right',
  Top = 'Top',
  Bottom = 'Bottom'
}

export interface Flow {
  /** @format uuid */
  id: string;
  label?: string | null;
  description?: string | null;
  blocks?: FlowBlock[] | null;
  connections?: FlowConnection[] | null;
}

export interface FlowBlock {
  /** @format uuid */
  id: string;
  label?: string | null;
  functionType?: string | null;
  offset: Offset;
  size: Size;
  /** @format int32 */
  zOrder: number;
  io?: InputOutput[] | null;
}

export interface FlowConnection {
  /** @format uuid */
  startBlockId: string;
  /** @format int32 */
  startPin: number;
  /** @format uuid */
  endBlockId: string;
  /** @format int32 */
  endPin: number;
}

export interface FlowSummary {
  /** @format uuid */
  id: string;
  label?: string | null;
  description?: string | null;
}

export interface InputOutput {
  /** @format int32 */
  pin: number;
  label?: string | null;
  description?: string | null;
  type: InputOutputSignalType;
  direction: InputOutputDirection;
  offset: Offset;
  size: Size;
  side: BlockSide;
}

export enum InputOutputDirection {
  Input = 'Input',
  Output = 'Output'
}

export enum InputOutputSignalType {
  Analogue = 'Analogue',
  Digital = 'Digital',
  PWM = 'PWM'
}

export interface Offset {
  /** @format double */
  x: number;
  /** @format double */
  y: number;
}

export interface Size {
  /** @format double */
  width: number;
  /** @format double */
  height: number;
}

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (securityData: SecurityDataType | null) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({ secure, path, type, query, format, body, ...params }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) && this.securityWorker && (await this.securityWorker(this.securityData))) || {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type ? { 'Content-Type': type } : {})
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path
      })
      .then((response) => response.data);
  };
}

/**
 * @title Mekatrol.Automatum.NodeServer, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  data = {
    /**
     * No description
     *
     * @tags Data
     * @name ReloadData
     * @request GET:/data
     */
    reloadData: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/data`,
        method: 'GET',
        ...params
      })
  };
  flows = {
    /**
     * No description
     *
     * @tags Flows
     * @name FlowsList
     * @request GET:/flows
     */
    flowsList: (params: RequestParams = {}) =>
      this.request<FlowSummary[], any>({
        path: `/flows`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Flows
     * @name FlowsCreate
     * @request POST:/flows
     */
    flowsCreate: (data: Flow, params: RequestParams = {}) =>
      this.request<Flow, any>({
        path: `/flows`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Flows
     * @name FlowsUpdate
     * @request PUT:/flows
     */
    flowsUpdate: (data: Flow, params: RequestParams = {}) =>
      this.request<Flow, any>({
        path: `/flows`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Flows
     * @name FlowsDetail
     * @request GET:/flows/{id}
     */
    flowsDetail: (id: string, params: RequestParams = {}) =>
      this.request<Flow, any>({
        path: `/flows/${id}`,
        method: 'GET',
        format: 'json',
        ...params
      }),

    /**
     * No description
     *
     * @tags Flows
     * @name FlowsDelete
     * @request DELETE:/flows/{id}
     */
    flowsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/flows/${id}`,
        method: 'DELETE',
        ...params
      })
  };
}
