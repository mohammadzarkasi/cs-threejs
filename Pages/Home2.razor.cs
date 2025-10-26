using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

namespace cs_three.Pages;

public partial class Home2 : ComponentBase, IAsyncDisposable
{
    //private IJSObjectReference? JsModule;
    [Inject] private IJSRuntime JSRuntime { get; set; } = null!;
    private string threeJsCdnUrl = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js";

    private List<int> cubes = [];

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        if (firstRender)
        {
            var ts = DateTime.UtcNow;
            await JSRuntime.InvokeVoidAsync("ScriptInjector.injectScript", "threejs-cdn", threeJsCdnUrl);
            await JSRuntime.InvokeVoidAsync("ScriptInjector.injectScript", "my-threejs", "js/my-threejs.js?ts=" + ts.ToString("o"));
            await JSRuntime.InvokeVoidAsync("MyThree.Init", new {
                camera = new {
                    position = new {
                        x = 0,
                        y = 1,
                        z = 15,
                    },
                },
                objects = new List<object>(){
                    new { 
                        type = "cube",
                        args = new {
                            size = new {
                                x = 1,
                                y = 2,
                                z = 3,
                            },
                            position = new {
                                x = -2,
                                y = 0,
                                z = 1
                            },
                            material = "meshbasic",
                            color = 0xff0000
                        },
                    },
                    new { 
                        type = "cube",
                        args = new {
                            size = new {
                                x = 1,
                                y = 1.2,
                                z = 5
                            },
                            position = new {
                                x = 3,
                                y = 2,
                                z = -1
                            },
                            material = "meshbasic",
                            color = 0x00ff00
                        },
                    }
                }
            });
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