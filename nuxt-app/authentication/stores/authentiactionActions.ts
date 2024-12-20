import { tryUseNuxtApp } from "nuxt/app";
import * as axiosUtility from "../../utility/axiosInstance";
import { useAuthenticationStore } from "./authenticationStore";

export const authenticationActions = {
	async requestGithubOauthRedirectionToDjango(): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		try {
			return await djangoAxiosInst
				.get("/github-oauth/github")
				.then((res) => {
					window.location.href = res.data.url;
				});
		} catch (error) {
			console.error(
				"requestGithubOauthRedirectionToDjango() axios 오류!",
				error
			);
		}
	},
	async requestAccessTokenToDjangoRedirection(code): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const authenticationStore = useAuthenticationStore();

		try {
			const response = await djangoAxiosInst.post(
				"/github-oauth/github/access-token",
				code
			);
			authenticationStore.isAuthenticated = true;
			return response.data;
		} catch (error) {
			console.error(
				"requestAccessTokenToDjangoRedirection() axios 오류!",
				error
			);
		}
	},
	async requestLogoutToDjango(): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const authenticationStore = useAuthenticationStore();

		try {
			const userToken = localStorage.getItem("userToken");
			await djangoAxiosInst.post("/github-oauth/github/logout", {
				userToken: userToken,
			});
			authenticationStore.isAuthenticated = false;
			localStorage.removeItem("userToken");
		} catch (error) {
			console.error("requestLogoutToDjango() axios 오류!", error);
		}
	},
	async requestUserTokenValidationToDjango(): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		const authenticationStore = useAuthenticationStore();

		try {
			const userToken = localStorage.getItem("userToken");
			const response = await djangoAxiosInst.post(
				"/github-oauth/github/usertoken-validation",
				{ userToken: userToken }
			);
			authenticationStore.isAuthenticated = response.data.response;
		} catch (error) {
			console.error("requestUserTokenValidationToDjango() error!", error);
		}
	},
	async requestCheckModifyingAllowedUserToDjango(name, token): Promise<void> {
		const { djangoAxiosInst } = axiosUtility.createAxiosInstances();
		try {
			const payload = {
				userName: name,
				userToken: token,
			};
			return await djangoAxiosInst.post(
				"/github-oauth/is-modifying-allowed-user",
				payload
			);
		} catch (error) {
			console.error(
				"requestCheckModifyingAllowedUserToDjango() error!",
				error
			);
		}
	},
};
