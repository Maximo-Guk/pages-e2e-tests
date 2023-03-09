import dotenv from "dotenv";
import { join } from "path";
import { fileURLToPath } from "url";
import { defaultExclude, defaultInclude } from "vitest/config";
import { ONE_MINUTE, ONE_SECOND } from "./utils";

export const DIRNAME = fileURLToPath(new URL("../../", import.meta.url));

dotenv.config({ path: join(DIRNAME, ".env") });

export const GIT_REPO = "git@github.com:GregBrimble/pages-e2e-tests.git";
export const GIT_USERNAME = "Pages e2e Tests Bot";
export const GIT_EMAIL_ADDRESS = "cloudflare-pages-team@cloudflare.com";

interface PagesProjectCredentials {
	CLOUDFLARE_ACCOUNT_ID: string;
	CLOUDFLARE_API_TOKEN: string;
	PROJECT_NAME: string;
	GIT_REPO?: string;
}

export const TEST_RESULTS_PAGES_PROJECT: PagesProjectCredentials = {
	CLOUDFLARE_ACCOUNT_ID: "5a883b414d4090a1442b20361f3c43a9",
	CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
	PROJECT_NAME: "pages-e2e-tests-tmp",
};

export enum Environment {
	Production = "production",
	// Staging = "staging",
}

export enum Trigger {
	GitHub,
	// GitLab,
	// DirectUpload,
}

export const PAGES_PROJECTS = {
	[Environment.Production]: {
		[Trigger.GitHub]: {
			CLOUDFLARE_ACCOUNT_ID: "5a883b414d4090a1442b20361f3c43a9",
			CLOUDFLARE_API_TOKEN: process.env.CLOUDFLARE_API_TOKEN,
			PROJECT_NAME: "pages-e2e-tests-tmp",
			GIT_REPO: "git@github.com:GregBrimble/pages-e2e-tests.git",
		},
	},
} satisfies Record<Environment, Record<Trigger, PagesProjectCredentials>>;

export const HOSTS = {
	[Environment.Production]: {
		api: "https://api.cloudflare.com",
		dash: "https://dash.cloudflare.com",
	},
} satisfies Record<Environment, { api: string; dash: string }>;

export const TEST_INCLUDE = defaultInclude;
export const TEST_EXCLUDE = defaultExclude;
export const TEST_RESULTS_BRANCH_NAME = "test-results";
export const TEST_RESULTS_PATH = join(DIRNAME, "dist");

// https://developers.cloudflare.com/pages/platform/limits#builds
// Pages Builds are allowed 20 minutes, and we're adding a buffer of time of 3 minutes to allow for queueing
export const DEPLOYMENT_TIMEOUT = 23 * ONE_MINUTE;
// How frequently we should poll the Pages API to check for Deployment completion
export const DEPLOYMENT_CHECK_INTERVAL = 5 * ONE_SECOND;
// How many not-OK API responses we accept when polling for Deployment completion before erroring
export const DEPLOYMENT_CHECK_API_FAILURES_THRESHOLD = 5;
// How long we wait for the Deployment to actually go live on the internet after Build completion
export const PROVISIONER_TIMEOUT = 30 * ONE_SECOND;
// How frequently we should poll the deployment URL to check for provisioner completion
export const PROVISIONER_CHECK_INTERVAL = 5 * ONE_SECOND;

export const FIXTURES_PATH = join(DIRNAME, "fixtures");
export const FEATURES_PATH = join(DIRNAME, "features");
export const GLOBAL_TESTS_PATH = join(DIRNAME, "__tests__");
export const ASSETS_PATH = join(DIRNAME, "assets");
export const TESTS_PATH = join(DIRNAME, "test-workspaces");
