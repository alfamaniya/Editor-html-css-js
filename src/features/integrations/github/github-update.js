(() => {
    'use strict';

    const status = document.getElementById('githubUpdateStatus');
    const time = document.getElementById('githubUpdateTime');
    const link = document.getElementById('githubUpdateLink');
    if (!status || !time || !link) return;

    const repository = 'alfamaniya/Editor-html-css-js';
    const apiUrl = 'https://api.github.com/repos/' + repository + '/commits?sha=main&per_page=1';

    function showUnavailable() {
        status.textContent = 'زمان آخرین به‌روزرسانی GitHub در دسترس نیست.';
        time.textContent = '';
        link.hidden = true;
    }

    fetch(apiUrl, {
        headers: { Accept: 'application/vnd.github+json' },
        cache: 'no-store'
    })
        .then((response) => {
            if (!response.ok) throw new Error('GitHub API returned ' + response.status);
            return response.json();
        })
        .then((commits) => {
            const latest = Array.isArray(commits) ? commits[0] : null;
            const dateString = latest && latest.commit &&
                ((latest.commit.committer && latest.commit.committer.date) ||
                 (latest.commit.author && latest.commit.author.date));
            if (!latest || !dateString || !latest.sha || !latest.html_url) {
                showUnavailable();
                return;
            }

            const date = new Date(dateString);
            if (Number.isNaN(date.getTime())) {
                showUnavailable();
                return;
            }

            const formatted = new Intl.DateTimeFormat('fa-IR-u-ca-persian-nu-latn', {
                dateStyle: 'medium',
                timeStyle: 'short',
                timeZone: 'Asia/Tehran'
            }).format(date);

            status.textContent = 'آخرین به‌روزرسانی مخزن GitHub (شاخه main):';
            time.textContent = formatted + ' · زمان تهران';
            link.href = latest.html_url;
            link.title = latest.commit.message || 'مشاهده آخرین کامیت در GitHub';
            link.hidden = false;
        })
        .catch(showUnavailable);
})();
