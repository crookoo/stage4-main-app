var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import DataService from "./service/DataService";
import CategoryList from "./components/CategoryList";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";
import PageScreen from "./components/PageScreen";
import SinglePost from "./components/SinglePost";
import Spinner from "./components/partials/Spinner";
import NotFound from "./components/NotFound";
import SitemapGenerator from "./components/SitemapGenerator";
export default function App() {
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState(new DataService()), data = _b[0], setData = _b[1];
    useEffect(function () {
        data.loadDataFromServer(setIsLoading, setData);
    }, [data]);
    // Added dependency "data" because ESLint was complaining 
    // Also see: https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook
    return (_jsxs("div", __assign({ className: "d-flex flex-column h-100" }, { children: [_jsx(Navbar, {}), isLoading ? _jsx(Spinner, {}) :
                _jsxs(Routes, { children: [_jsxs(Route, __assign({ path: "/", element: _jsx(Layout, {}) }, { children: [_jsx(Route, { index: true, element: _jsx(Home, { data: data }) }), _jsx(Route, { path: ":categorySlug", element: _jsx(CategoryList, { data: data }) }), _jsx(Route, { path: ":categorySlug/:postSlug", element: _jsx(SinglePost, { data: data }) }), _jsx(Route, { path: "impressum", element: _jsx(PageScreen, { data: data }) }), _jsx(Route, { path: "datenschutz", element: _jsx(PageScreen, { data: data }) }), _jsx(Route, { path: "sitemap", element: _jsx(SitemapGenerator, { data: data }) })] })), _jsx(Route, { path: "*", element: _jsx(NotFound, { referrer: "Wurzelelement" }) })] }), _jsx(Footer, {})] })));
}
