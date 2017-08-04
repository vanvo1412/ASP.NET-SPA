FROM microsoft/dotnet:1.1-runtime-nanoserver
WORKDIR /dotnetapp
COPY out .
ENTRYPOINT ["dotnet", "DNX_SPA.dll"]