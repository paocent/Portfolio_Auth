<Routes>
<Route path="/" element={<Home />} />
<Route path="/pricing" element={<Pricing />} />
<Route
path="/dashboard"
element={
<RequireAuth>
<Dashboard />
</RequireAuth>
}
/>
<Route
path="/settings"
element={
<RequireAuth>
<Settings />
</RequireAuth>
}
/>
<Route path="/login" element={<Login />} />
</Routes>