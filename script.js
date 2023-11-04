function fetchGitHubData() {
    const username = document.getElementById("github-username").value;
    fetch(`https://api.github.com/users/${username}/repos`)
        .then((response) => response.json())
        .then((data) => {
            const contributionsData = data.map((repo) => repo.stargazers_count);

            const ctx = document.getElementById("contributions-chart").getContext("2d");
            const chart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data.map((repo) => repo.name),
                    datasets: [
                        {
                            label: "Contributions",
                            data: contributionsData,
                            backgroundColor: "rgba(75, 192, 192, 0.6)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
            document.body.style.backgroundColor = '#f4f4f4';
            document.querySelector('h1').style.backgroundColor = '#24292e';
            document.querySelector('canvas').style.transform = 'scale(1)';
        })
        .catch((error) => {
            console.error("Error fetching GitHub data:", error);
            document.body.style.backgroundColor = '#FF5733';
            document.querySelector('h1').style.backgroundColor = '#FF5733';
            document.querySelector('canvas').style.transform = 'scale(0.8)';
        });
}
