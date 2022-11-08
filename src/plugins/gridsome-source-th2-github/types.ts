import {
  GetResponseDataTypeFromEndpointMethod,
} from '@octokit/types'
import { Octokit } from 'octokit'

const octokit = new Octokit();

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type RepositoryRaw = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.get>
export type RepositoriesListRaw = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listForOrg>
export type ReducedRepositoryRaw = ArrayElement<RepositoriesListRaw>
export type ReleaseRaw = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.getRelease>
export type ReleasesListRaw = GetResponseDataTypeFromEndpointMethod<typeof octokit.rest.repos.listReleases>
