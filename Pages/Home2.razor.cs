using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace cs_three.Pages;

public partial class Home2 : ComponentBase, IAsyncDisposable
{
    //private IJSObjectReference? JsModule;
    [Inject] private IJSRuntime JSRuntime { get; set; } = null!;
    private string threeJsCdnUrl = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
             await JSRuntime.InvokeVoidAsync("ScriptInjector.injectScript", "threejs-cdn", threeJsCdnUrl);
             await JSRuntime.InvokeVoidAsync("ScriptInjector.injectScript", "my-threejs", "js/my-threejs.js");
             await JSRuntime.InvokeVoidAsync("MyThree.Init");
        }
        //return base.OnAfterRenderAsync(firstRender);
    }


    public async ValueTask DisposeAsync()
    {
        await JSRuntime.InvokeVoidAsync("MyThree.Dispose");
        await JSRuntime.InvokeVoidAsync("ScriptInjector.removeScript", "my-threejs");
        await JSRuntime.InvokeVoidAsync("ScriptInjector.removeScript", "threejs-cdn");
    }
}