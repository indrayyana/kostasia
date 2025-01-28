/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server';
import httpStatus from 'http-status';

import ApiError from './ApiError';
import { ContextParams } from '@/types/context';

type RouteHandler = (
  req: NextRequest,
  ctx: ContextParams
) => Promise<NextResponse>;

const catchAsync = (fn: RouteHandler) => {
  return async (req: NextRequest, ctx: ContextParams) => {
    try {
      return await fn(req, ctx);
    } catch (error: any) {
      if (error instanceof ApiError) {
        const responseBody: {
          code: number;
          status: string;
          message: string;
          errors?: any;
        } = { code: error.statusCode, status: 'error', message: error.message };

        if (error.statusCode === httpStatus.BAD_REQUEST && error.errors) {
          responseBody.errors = error.errors;
        }

        return NextResponse.json(responseBody, { status: error.statusCode });
      }

      return NextResponse.json(
        {
          code: httpStatus.INTERNAL_SERVER_ERROR,
          status: 'error',
          message: 'Internal Server Error',
        },
        { status: httpStatus.INTERNAL_SERVER_ERROR }
      );
    }
  };
};

export default catchAsync;

