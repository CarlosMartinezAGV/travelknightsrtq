import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with an object with an `error_description` and `error` property
 */
interface ErrorMessage {
  error: string;
  error_description: string;
}

export function isErrorWithMessage(
  error: unknown
): error is { data: ErrorMessage } {
  const hasValidStructure =
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data: ErrorMessage }).data === "object";

  const data = hasValidStructure
    ? (error as { data: ErrorMessage }).data
    : null;
  const hasValidProperties =
    data !== null &&
    "error_description" in data &&
    "error" in data &&
    typeof data.error === "string" &&
    typeof data.error_description === "string";

  return hasValidStructure && hasValidProperties;
}
