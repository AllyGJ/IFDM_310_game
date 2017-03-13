// Compiled shader for PC, Mac & Linux Standalone

//////////////////////////////////////////////////////////////////////////
// 
// NOTE: This is *not* a valid shader file, the contents are provided just
// for information and for debugging purposes only.
// 
//////////////////////////////////////////////////////////////////////////
// Skipping shader variants that would not be included into build of current scene.

Shader "Sprites/Default" {
Properties {
[PerRendererData]  _MainTex ("Sprite Texture", 2D) = "white" { }
 _Color ("Tint", Color) = (1.000000,1.000000,1.000000,1.000000)
[MaterialToggle]  PixelSnap ("Pixel snap", Float) = 0.000000
}
SubShader { 
 Tags { "QUEUE"="Transparent" "IGNOREPROJECTOR"="true" "RenderType"="Transparent" "CanUseSpriteAtlas"="true" "PreviewType"="Plane" }
 Pass {
  Tags { "QUEUE"="Transparent" "IGNOREPROJECTOR"="true" "RenderType"="Transparent" "CanUseSpriteAtlas"="true" "PreviewType"="Plane" }
  ZWrite Off
  Cull Off
  Blend One OneMinusSrcAlpha
  //////////////////////////////////
  //                              //
  //      Compiled programs       //
  //                              //
  //////////////////////////////////
//////////////////////////////////////////////////////
No keywords set in this variant.
-- Vertex shader for "metal":
Uses vertex data channel "Vertex"
Uses vertex data channel "Normal"
Uses vertex data channel "TexCoord"

Constant Buffer "Globals" (72 bytes) on slot 0 {
  Matrix4x4 glstate_matrix_mvp at 0
  VectorHalf4 _Color at 64
}

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Globals_Type
{
    float4 hlslcc_mtx4x4glstate_matrix_mvp[4];
    half4 _Color;
};

struct Mtl_VertexIn
{
    float4 POSITION0 [[ attribute(0) ]] ;
    float4 COLOR0 [[ attribute(1) ]] ;
    float2 TEXCOORD0 [[ attribute(2) ]] ;
};

struct Mtl_VertexOut
{
    float4 mtl_Position [[ position ]];
    half4 COLOR0 [[ user(COLOR0) ]];
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]];
};

vertex Mtl_VertexOut xlatMtlMain(
    constant Globals_Type& Globals [[ buffer(0) ]],
    Mtl_VertexIn input [[ stage_in ]])
{
    Mtl_VertexOut output;
    float4 u_xlat0;
    u_xlat0 = input.POSITION0.yyyy * Globals.hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[0] * input.POSITION0.xxxx + u_xlat0;
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[2] * input.POSITION0.zzzz + u_xlat0;
    output.mtl_Position = u_xlat0 + Globals.hlslcc_mtx4x4glstate_matrix_mvp[3];
    u_xlat0 = input.COLOR0 * float4(Globals._Color);
    output.COLOR0 = half4(u_xlat0);
    output.TEXCOORD0.xy = input.TEXCOORD0.xy;
    return output;
}


-- Fragment shader for "metal":
Set 2D Texture "_MainTex" to slot 0

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Mtl_FragmentIn
{
    half4 COLOR0 [[ user(COLOR0) ]] ;
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]] ;
};

struct Mtl_FragmentOut
{
    half4 SV_Target0 [[ color(0) ]];
};

fragment Mtl_FragmentOut xlatMtlMain(
    texture2d<half, access::sample > _MainTex [[ texture (0) ]] ,
    sampler sampler_MainTex [[ sampler (0) ]] ,
    Mtl_FragmentIn input [[ stage_in ]])
{
    Mtl_FragmentOut output;
    half4 u_xlat16_0;
    u_xlat16_0 = _MainTex.sample(sampler_MainTex, input.TEXCOORD0.xy);
    u_xlat16_0 = half4(u_xlat16_0 * input.COLOR0);
    output.SV_Target0.xyz = half3(u_xlat16_0.www * u_xlat16_0.xyz);
    output.SV_Target0.w = u_xlat16_0.w;
    return output;
}


-- Vertex shader for "glcore":
Shader Disassembly:
#ifdef VERTEX
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform 	vec4 hlslcc_mtx4x4glstate_matrix_mvp[4];
uniform 	vec4 _Color;
in  vec4 in_POSITION0;
in  vec4 in_COLOR0;
in  vec2 in_TEXCOORD0;
out vec4 vs_COLOR0;
out vec2 vs_TEXCOORD0;
vec4 u_xlat0;
void main()
{
    u_xlat0 = in_POSITION0.yyyy * hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[0] * in_POSITION0.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[2] * in_POSITION0.zzzz + u_xlat0;
    gl_Position = u_xlat0 + hlslcc_mtx4x4glstate_matrix_mvp[3];
    vs_COLOR0 = in_COLOR0 * _Color;
    vs_TEXCOORD0.xy = in_TEXCOORD0.xy;
    return;
}

#endif
#ifdef FRAGMENT
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform  sampler2D _MainTex;
in  vec4 vs_COLOR0;
in  vec2 vs_TEXCOORD0;
layout(location = 0) out vec4 SV_Target0;
vec4 u_xlat0;
lowp vec4 u_xlat10_0;
void main()
{
    u_xlat10_0 = texture(_MainTex, vs_TEXCOORD0.xy);
    u_xlat0 = u_xlat10_0 * vs_COLOR0;
    SV_Target0.xyz = u_xlat0.www * u_xlat0.xyz;
    SV_Target0.w = u_xlat0.w;
    return;
}

#endif


-- Fragment shader for "glcore":
Shader Disassembly:
// All GLSL source is contained within the vertex program

//////////////////////////////////////////////////////
Keywords set in this variant: ETC1_EXTERNAL_ALPHA 
-- Vertex shader for "metal":
Uses vertex data channel "Vertex"
Uses vertex data channel "Normal"
Uses vertex data channel "TexCoord"

Constant Buffer "Globals" (72 bytes) on slot 0 {
  Matrix4x4 glstate_matrix_mvp at 0
  VectorHalf4 _Color at 64
}

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Globals_Type
{
    float4 hlslcc_mtx4x4glstate_matrix_mvp[4];
    half4 _Color;
};

struct Mtl_VertexIn
{
    float4 POSITION0 [[ attribute(0) ]] ;
    float4 COLOR0 [[ attribute(1) ]] ;
    float2 TEXCOORD0 [[ attribute(2) ]] ;
};

struct Mtl_VertexOut
{
    float4 mtl_Position [[ position ]];
    half4 COLOR0 [[ user(COLOR0) ]];
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]];
};

vertex Mtl_VertexOut xlatMtlMain(
    constant Globals_Type& Globals [[ buffer(0) ]],
    Mtl_VertexIn input [[ stage_in ]])
{
    Mtl_VertexOut output;
    float4 u_xlat0;
    u_xlat0 = input.POSITION0.yyyy * Globals.hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[0] * input.POSITION0.xxxx + u_xlat0;
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[2] * input.POSITION0.zzzz + u_xlat0;
    output.mtl_Position = u_xlat0 + Globals.hlslcc_mtx4x4glstate_matrix_mvp[3];
    u_xlat0 = input.COLOR0 * float4(Globals._Color);
    output.COLOR0 = half4(u_xlat0);
    output.TEXCOORD0.xy = input.TEXCOORD0.xy;
    return output;
}


-- Fragment shader for "metal":
Set 2D Texture "_MainTex" to slot 0
Set 2D Texture "_AlphaTex" to slot 1

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Mtl_FragmentIn
{
    half4 COLOR0 [[ user(COLOR0) ]] ;
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]] ;
};

struct Mtl_FragmentOut
{
    half4 SV_Target0 [[ color(0) ]];
};

fragment Mtl_FragmentOut xlatMtlMain(
    texture2d<half, access::sample > _MainTex [[ texture (0) ]] ,
    sampler sampler_MainTex [[ sampler (0) ]] ,
    texture2d<half, access::sample > _AlphaTex [[ texture (1) ]] ,
    sampler sampler_AlphaTex [[ sampler (1) ]] ,
    Mtl_FragmentIn input [[ stage_in ]])
{
    Mtl_FragmentOut output;
    float4 u_xlat0;
    half4 u_xlat16_0;
    u_xlat0.xyz = float3(_MainTex.sample(sampler_MainTex, input.TEXCOORD0.xy).xyz);
    u_xlat0.w = float(_AlphaTex.sample(sampler_AlphaTex, input.TEXCOORD0.xy).x);
    u_xlat16_0 = half4(u_xlat0 * float4(input.COLOR0));
    output.SV_Target0.xyz = half3(u_xlat16_0.www * u_xlat16_0.xyz);
    output.SV_Target0.w = u_xlat16_0.w;
    return output;
}


-- Vertex shader for "glcore":
Shader Disassembly:
#ifdef VERTEX
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform 	vec4 hlslcc_mtx4x4glstate_matrix_mvp[4];
uniform 	vec4 _Color;
in  vec4 in_POSITION0;
in  vec4 in_COLOR0;
in  vec2 in_TEXCOORD0;
out vec4 vs_COLOR0;
out vec2 vs_TEXCOORD0;
vec4 u_xlat0;
void main()
{
    u_xlat0 = in_POSITION0.yyyy * hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[0] * in_POSITION0.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[2] * in_POSITION0.zzzz + u_xlat0;
    gl_Position = u_xlat0 + hlslcc_mtx4x4glstate_matrix_mvp[3];
    vs_COLOR0 = in_COLOR0 * _Color;
    vs_TEXCOORD0.xy = in_TEXCOORD0.xy;
    return;
}

#endif
#ifdef FRAGMENT
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform  sampler2D _MainTex;
uniform  sampler2D _AlphaTex;
in  vec4 vs_COLOR0;
in  vec2 vs_TEXCOORD0;
layout(location = 0) out vec4 SV_Target0;
vec4 u_xlat0;
lowp vec4 u_xlat10_1;
void main()
{
    u_xlat0 = texture(_MainTex, vs_TEXCOORD0.xy);
    u_xlat10_1 = texture(_AlphaTex, vs_TEXCOORD0.xy);
    u_xlat0.w = u_xlat10_1.x;
    u_xlat0 = u_xlat0 * vs_COLOR0;
    SV_Target0.xyz = u_xlat0.www * u_xlat0.xyz;
    SV_Target0.w = u_xlat0.w;
    return;
}

#endif


-- Fragment shader for "glcore":
Shader Disassembly:
// All GLSL source is contained within the vertex program

//////////////////////////////////////////////////////
Keywords set in this variant: PIXELSNAP_ON 
-- Vertex shader for "metal":
Uses vertex data channel "Vertex"
Uses vertex data channel "Normal"
Uses vertex data channel "TexCoord"

Constant Buffer "Globals" (88 bytes) on slot 0 {
  Matrix4x4 glstate_matrix_mvp at 16
  Vector4 _ScreenParams at 0
  VectorHalf4 _Color at 80
}

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Globals_Type
{
    float4 _ScreenParams;
    float4 hlslcc_mtx4x4glstate_matrix_mvp[4];
    half4 _Color;
};

struct Mtl_VertexIn
{
    float4 POSITION0 [[ attribute(0) ]] ;
    float4 COLOR0 [[ attribute(1) ]] ;
    float2 TEXCOORD0 [[ attribute(2) ]] ;
};

struct Mtl_VertexOut
{
    float4 mtl_Position [[ position ]];
    half4 COLOR0 [[ user(COLOR0) ]];
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]];
};

vertex Mtl_VertexOut xlatMtlMain(
    constant Globals_Type& Globals [[ buffer(0) ]],
    Mtl_VertexIn input [[ stage_in ]])
{
    Mtl_VertexOut output;
    float4 u_xlat0;
    float2 u_xlat1;
    u_xlat0 = input.POSITION0.yyyy * Globals.hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[0] * input.POSITION0.xxxx + u_xlat0;
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[2] * input.POSITION0.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + Globals.hlslcc_mtx4x4glstate_matrix_mvp[3];
    u_xlat0.xy = u_xlat0.xy / u_xlat0.ww;
    u_xlat1.xy = Globals._ScreenParams.xy * float2(0.5, 0.5);
    u_xlat0.xy = u_xlat0.xy * u_xlat1.xy;
    u_xlat0.xy = rint(u_xlat0.xy);
    u_xlat0.xy = u_xlat0.xy / u_xlat1.xy;
    output.mtl_Position.xy = u_xlat0.ww * u_xlat0.xy;
    output.mtl_Position.zw = u_xlat0.zw;
    u_xlat0 = input.COLOR0 * float4(Globals._Color);
    output.COLOR0 = half4(u_xlat0);
    output.TEXCOORD0.xy = input.TEXCOORD0.xy;
    return output;
}


-- Fragment shader for "metal":
Set 2D Texture "_MainTex" to slot 0

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Mtl_FragmentIn
{
    half4 COLOR0 [[ user(COLOR0) ]] ;
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]] ;
};

struct Mtl_FragmentOut
{
    half4 SV_Target0 [[ color(0) ]];
};

fragment Mtl_FragmentOut xlatMtlMain(
    texture2d<half, access::sample > _MainTex [[ texture (0) ]] ,
    sampler sampler_MainTex [[ sampler (0) ]] ,
    Mtl_FragmentIn input [[ stage_in ]])
{
    Mtl_FragmentOut output;
    half4 u_xlat16_0;
    u_xlat16_0 = _MainTex.sample(sampler_MainTex, input.TEXCOORD0.xy);
    u_xlat16_0 = half4(u_xlat16_0 * input.COLOR0);
    output.SV_Target0.xyz = half3(u_xlat16_0.www * u_xlat16_0.xyz);
    output.SV_Target0.w = u_xlat16_0.w;
    return output;
}


-- Vertex shader for "glcore":
Shader Disassembly:
#ifdef VERTEX
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform 	vec4 _ScreenParams;
uniform 	vec4 hlslcc_mtx4x4glstate_matrix_mvp[4];
uniform 	vec4 _Color;
in  vec4 in_POSITION0;
in  vec4 in_COLOR0;
in  vec2 in_TEXCOORD0;
out vec4 vs_COLOR0;
out vec2 vs_TEXCOORD0;
vec4 u_xlat0;
vec2 u_xlat1;
void main()
{
    u_xlat0 = in_POSITION0.yyyy * hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[0] * in_POSITION0.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[2] * in_POSITION0.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + hlslcc_mtx4x4glstate_matrix_mvp[3];
    u_xlat0.xy = u_xlat0.xy / u_xlat0.ww;
    u_xlat1.xy = _ScreenParams.xy * vec2(0.5, 0.5);
    u_xlat0.xy = u_xlat0.xy * u_xlat1.xy;
    u_xlat0.xy = roundEven(u_xlat0.xy);
    u_xlat0.xy = u_xlat0.xy / u_xlat1.xy;
    gl_Position.xy = u_xlat0.ww * u_xlat0.xy;
    gl_Position.zw = u_xlat0.zw;
    vs_COLOR0 = in_COLOR0 * _Color;
    vs_TEXCOORD0.xy = in_TEXCOORD0.xy;
    return;
}

#endif
#ifdef FRAGMENT
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform  sampler2D _MainTex;
in  vec4 vs_COLOR0;
in  vec2 vs_TEXCOORD0;
layout(location = 0) out vec4 SV_Target0;
vec4 u_xlat0;
lowp vec4 u_xlat10_0;
void main()
{
    u_xlat10_0 = texture(_MainTex, vs_TEXCOORD0.xy);
    u_xlat0 = u_xlat10_0 * vs_COLOR0;
    SV_Target0.xyz = u_xlat0.www * u_xlat0.xyz;
    SV_Target0.w = u_xlat0.w;
    return;
}

#endif


-- Fragment shader for "glcore":
Shader Disassembly:
// All GLSL source is contained within the vertex program

//////////////////////////////////////////////////////
Keywords set in this variant: ETC1_EXTERNAL_ALPHA PIXELSNAP_ON 
-- Vertex shader for "metal":
Uses vertex data channel "Vertex"
Uses vertex data channel "Normal"
Uses vertex data channel "TexCoord"

Constant Buffer "Globals" (88 bytes) on slot 0 {
  Matrix4x4 glstate_matrix_mvp at 16
  Vector4 _ScreenParams at 0
  VectorHalf4 _Color at 80
}

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Globals_Type
{
    float4 _ScreenParams;
    float4 hlslcc_mtx4x4glstate_matrix_mvp[4];
    half4 _Color;
};

struct Mtl_VertexIn
{
    float4 POSITION0 [[ attribute(0) ]] ;
    float4 COLOR0 [[ attribute(1) ]] ;
    float2 TEXCOORD0 [[ attribute(2) ]] ;
};

struct Mtl_VertexOut
{
    float4 mtl_Position [[ position ]];
    half4 COLOR0 [[ user(COLOR0) ]];
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]];
};

vertex Mtl_VertexOut xlatMtlMain(
    constant Globals_Type& Globals [[ buffer(0) ]],
    Mtl_VertexIn input [[ stage_in ]])
{
    Mtl_VertexOut output;
    float4 u_xlat0;
    float2 u_xlat1;
    u_xlat0 = input.POSITION0.yyyy * Globals.hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[0] * input.POSITION0.xxxx + u_xlat0;
    u_xlat0 = Globals.hlslcc_mtx4x4glstate_matrix_mvp[2] * input.POSITION0.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + Globals.hlslcc_mtx4x4glstate_matrix_mvp[3];
    u_xlat0.xy = u_xlat0.xy / u_xlat0.ww;
    u_xlat1.xy = Globals._ScreenParams.xy * float2(0.5, 0.5);
    u_xlat0.xy = u_xlat0.xy * u_xlat1.xy;
    u_xlat0.xy = rint(u_xlat0.xy);
    u_xlat0.xy = u_xlat0.xy / u_xlat1.xy;
    output.mtl_Position.xy = u_xlat0.ww * u_xlat0.xy;
    output.mtl_Position.zw = u_xlat0.zw;
    u_xlat0 = input.COLOR0 * float4(Globals._Color);
    output.COLOR0 = half4(u_xlat0);
    output.TEXCOORD0.xy = input.TEXCOORD0.xy;
    return output;
}


-- Fragment shader for "metal":
Set 2D Texture "_MainTex" to slot 0
Set 2D Texture "_AlphaTex" to slot 1

Shader Disassembly:
#include <metal_stdlib>
#include <metal_texture>
using namespace metal;
struct Mtl_FragmentIn
{
    half4 COLOR0 [[ user(COLOR0) ]] ;
    float2 TEXCOORD0 [[ user(TEXCOORD0) ]] ;
};

struct Mtl_FragmentOut
{
    half4 SV_Target0 [[ color(0) ]];
};

fragment Mtl_FragmentOut xlatMtlMain(
    texture2d<half, access::sample > _MainTex [[ texture (0) ]] ,
    sampler sampler_MainTex [[ sampler (0) ]] ,
    texture2d<half, access::sample > _AlphaTex [[ texture (1) ]] ,
    sampler sampler_AlphaTex [[ sampler (1) ]] ,
    Mtl_FragmentIn input [[ stage_in ]])
{
    Mtl_FragmentOut output;
    float4 u_xlat0;
    half4 u_xlat16_0;
    u_xlat0.xyz = float3(_MainTex.sample(sampler_MainTex, input.TEXCOORD0.xy).xyz);
    u_xlat0.w = float(_AlphaTex.sample(sampler_AlphaTex, input.TEXCOORD0.xy).x);
    u_xlat16_0 = half4(u_xlat0 * float4(input.COLOR0));
    output.SV_Target0.xyz = half3(u_xlat16_0.www * u_xlat16_0.xyz);
    output.SV_Target0.w = u_xlat16_0.w;
    return output;
}


-- Vertex shader for "glcore":
Shader Disassembly:
#ifdef VERTEX
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform 	vec4 _ScreenParams;
uniform 	vec4 hlslcc_mtx4x4glstate_matrix_mvp[4];
uniform 	vec4 _Color;
in  vec4 in_POSITION0;
in  vec4 in_COLOR0;
in  vec2 in_TEXCOORD0;
out vec4 vs_COLOR0;
out vec2 vs_TEXCOORD0;
vec4 u_xlat0;
vec2 u_xlat1;
void main()
{
    u_xlat0 = in_POSITION0.yyyy * hlslcc_mtx4x4glstate_matrix_mvp[1];
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[0] * in_POSITION0.xxxx + u_xlat0;
    u_xlat0 = hlslcc_mtx4x4glstate_matrix_mvp[2] * in_POSITION0.zzzz + u_xlat0;
    u_xlat0 = u_xlat0 + hlslcc_mtx4x4glstate_matrix_mvp[3];
    u_xlat0.xy = u_xlat0.xy / u_xlat0.ww;
    u_xlat1.xy = _ScreenParams.xy * vec2(0.5, 0.5);
    u_xlat0.xy = u_xlat0.xy * u_xlat1.xy;
    u_xlat0.xy = roundEven(u_xlat0.xy);
    u_xlat0.xy = u_xlat0.xy / u_xlat1.xy;
    gl_Position.xy = u_xlat0.ww * u_xlat0.xy;
    gl_Position.zw = u_xlat0.zw;
    vs_COLOR0 = in_COLOR0 * _Color;
    vs_TEXCOORD0.xy = in_TEXCOORD0.xy;
    return;
}

#endif
#ifdef FRAGMENT
#version 150
#extension GL_ARB_explicit_attrib_location : require
#extension GL_ARB_shader_bit_encoding : enable

uniform  sampler2D _MainTex;
uniform  sampler2D _AlphaTex;
in  vec4 vs_COLOR0;
in  vec2 vs_TEXCOORD0;
layout(location = 0) out vec4 SV_Target0;
vec4 u_xlat0;
lowp vec4 u_xlat10_1;
void main()
{
    u_xlat0 = texture(_MainTex, vs_TEXCOORD0.xy);
    u_xlat10_1 = texture(_AlphaTex, vs_TEXCOORD0.xy);
    u_xlat0.w = u_xlat10_1.x;
    u_xlat0 = u_xlat0 * vs_COLOR0;
    SV_Target0.xyz = u_xlat0.www * u_xlat0.xyz;
    SV_Target0.w = u_xlat0.w;
    return;
}

#endif


-- Fragment shader for "glcore":
Shader Disassembly:
// All GLSL source is contained within the vertex program

 }
}
}