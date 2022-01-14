import '@supabase/supabase-js/dist/umd/supabase.js'
const supabase = window.supabase.createClient('https://zmogagkknmpccbuebxcn.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNjQyMTg5OTkxLCJleHAiOjE5NTc3NjU5OTF9.SW19Qd-N9xqRlm10WQTOuThJNANFJyF8IryzkOWZ7PU')

const labelDataPromises = new Map()
export const getLabelData = async (id) => {
  if (!labelDataPromises.has(id)) {
    labelDataPromises.set(id, (async () => {
      const { data, error } = await supabase
        .from('nonprofit_labels')
        .select('name,logo_url,website_url')
        .eq('id', id)

      return {
        name: data[0]?.name,
        logoURL: data[0]?.logo_url,
        websiteURL: data[0]?.website_url,
      }
    })())
  }
  return labelDataPromises.get(id)
}
