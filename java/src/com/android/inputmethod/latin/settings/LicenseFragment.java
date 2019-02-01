/*
 * Copyright (C) 2019 Vít Skalický
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.android.inputmethod.latin.settings;


import android.app.Fragment;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.WebView;

import com.android.inputmethod.latin.R;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * A simple {@link Fragment} subclass.
 */
public class LicenseFragment extends SubScreenFragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        WebView webView = new WebView(getActivity());
        webView.loadData("<pre>" + loadLicense() + "</pre>", "text/html", "UTF-8");
        return webView;
    }

    private String loadLicense() {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(getResources().openRawResource(R.raw.license)));
            StringBuilder sb = new StringBuilder();
            String s = br.readLine();
            while (s != null) {
                sb.append(s + "<br>");
                s = br.readLine();
            }
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return "ERROR: License file not found.<br>Please report this to the developer of this app.<br> Error stack trace:<br><br>" + e.getStackTrace().toString().replace("\n","<br>");
        }
    }

}
