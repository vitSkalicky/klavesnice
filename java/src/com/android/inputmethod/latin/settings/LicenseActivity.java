package com.android.inputmethod.latin.settings;

import android.app.Activity;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebView;

import com.android.inputmethod.latin.R;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class LicenseActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_license);
        getActionBar().setDisplayHomeAsUpEnabled(true);
        setTitle(R.string.license);

        WebView webView = findViewById(R.id.webView);
        webView.loadData("<pre>" + loadLicense() + "</pre>", "text/html", "UTF-8");
    }

    private String loadLicense() {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(getResources().openRawResource(R.raw.license)));
            StringBuilder sb = new StringBuilder();
            String s = br.readLine();
            while (s != null) {
                sb.append(s + "\n");
                s = br.readLine();
            }
            return sb.toString();
        } catch (IOException e) {
            e.printStackTrace();
            return "ERROR: License file not found.\nPlease report this to the developer of this app.\n exception:\n\n" + e.getStackTrace();
        }
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            finish();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }
}
