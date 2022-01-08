/*
 * @Author: Cxy
 * @Date: 2021-04-06 10:03:17
 * @LastEditors: Cxy
 * @LastEditTime: 2021-11-19 19:37:41
 * @FilePath: \blog\blogweb\src\http\model\article.js
 */

import { get, post } from '../base.js'

export const article_Add = (body) => post({ url: '/api/articleAdd', body })

export const upload_File = (body, filePath) => post({ url: '/api/uploadFile?filePath=' + filePath, body })

export const article_Find = (query) => get({ url: '/api/articleFind', query: { params: query }})

export const article_Delete = (body) => post({ url: '/api/articleDelete', body })

export const Article_Prev_Next = (query) => get({ url: '/api/ArticlePrevNext', query: { params: query }})

export const article_Find_New_Like = (query) => get({ url: '/api/articleFindNewLike', query: { params: query }})

export const home_Page_Statistics = () => get({ url: '/api/homePageStatistics' })

export const home_Page_Statistics_Num = () => get({ url: '/api/homePageStatisticsNum' })

export const article_View_Page = (body) => post({ url: '/api/articleViewPage', body })

export const article_Search_Fuzzy = (query) => get({ url: '/api/articleSearchFuzzy', query: { params: query }})

export const articleTag_Add = (body) => post({ url: '/api/articleTagAdd', body })

export const articleTag_Find = (query) => get({ url: '/api/articleTagFind', query: { params: query }})

export const Guess_You_Like = (query) => get({ url: '/api/GuessYouLike', query: { params: query }})

export const random_To_Articles = (query) => get({ url: '/api/randomToArticles', query: { params: query }})

export const articleTag_Delete = (body) => post({ url: '/api/articleTagDelete', body })

export const do_Like_Articles = (body) => post({ url: '/api/doLikeArticles', body })

export const Like_Lready_Article = (query) => get({ url: '/api/LikeLreadyArticle', query: { params: query }})

export const My_Write_Article = (query) => get({ url: '/api/MyWriteArticle', query: { params: query }})

export const comment_Reply_Article = (body) => post({ url: '/api/commentReplyArticle', body })

export const comment_Get_Article = (query) => get({ url: '/api/commentGetArticle', query: { params: query }})

export const comment_Like_Article = (body) => post({ url: '/api/commentLikeArticle', body })

export const comment_Delete_Article = (body) => post({ url: '/api/commentDeleteArticle', body })

export const article_Statistics = () => get({ url: '/api/articleStatistics' })
